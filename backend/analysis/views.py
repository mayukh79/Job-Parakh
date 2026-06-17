# pyrefly: ignore [missing-import]
from rest_framework.decorators import api_view
# pyrefly: ignore [missing-import]
from rest_framework.response import Response
from .models import JobAnalysis
from django.db.models import Count
from .serializers import JobAnalysisSerializer
from django.shortcuts import get_object_or_404

from .risk_rules import (
    SUSPICIOUS_KEYWORDS,
    SUSPICIOUS_CONTACT_PATTERNS,
    FINANCIAL_SCAM_KEYWORDS,
    PRESSURE_TACTIC_KEYWORDS,
    RULES
)


@api_view(['POST'])
def analyze_job(request):
    text = request.data.get('job_description', '').lower()
    matched_rules = []

    for rule in RULES:

        if rule["keyword"] in text:

            matched_rules.append({
                "keyword": rule["keyword"],
                "weight": rule["weight"],
                "category": rule["category"]
        })

    score = 0
    reasons = []
    indicators_found = 0
    financial_count=0
    pressure_count=0
    contact_count=0

    for keyword, weight in SUSPICIOUS_KEYWORDS.items():

        if keyword in text:

            indicators_found += 1
            score += weight

            if keyword in FINANCIAL_SCAM_KEYWORDS:
                financial_count += 1

            if keyword in PRESSURE_TACTIC_KEYWORDS:
                pressure_count += 1

            reasons.append(
                f"Suspicious keyword found: {keyword} (+{weight})"
            )

    for pattern, weight in SUSPICIOUS_CONTACT_PATTERNS.items():

        if pattern in text:

            indicators_found += 1
            score += weight
            contact_count += 1

            reasons.append(
                f"Suspicious contact pattern: {pattern} (+{weight})"
            )

    if score == 0:
        reasons.append(
            "No suspicious patterns detected"
        )

    if score > 100:
        score = 100

    if score >= 70:
        level = "High"

    elif score >= 40:
        level = "Medium"

    else:
        level = "Low"

    JobAnalysis.objects.create(
    job_description=text,
    risk_score=score,
    risk_level=level
)

    return Response({
        "risk_score": score,
        "risk_level": level,
        "indicators_found": indicators_found,
        "matched_rules": matched_rules,
        "analysis_summary":
            f"{indicators_found} suspicious indicator(s) detected.",
        "category_breakdown": {
            "financial_scam_indicators": financial_count,
            "pressure_tactics": pressure_count,
            "suspicious_contact_methods": contact_count
        },
        "reasons": reasons
    })
    
@api_view(['GET'])
def analysis_history(request):

    analyses = JobAnalysis.objects.all().order_by(
        '-created_at'
    )

    serializer = JobAnalysisSerializer(
        analyses,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(['GET'])
def analysis_detail(request, analysis_id):

    analysis = get_object_or_404(
        JobAnalysis,
        id=analysis_id
    )

    serializer = JobAnalysisSerializer(
        analysis
    )

    return Response(
        serializer.data
    )
    
@api_view(['GET'])
def analysis_stats(request):

    total_analyses = JobAnalysis.objects.count()

    high_risk = JobAnalysis.objects.filter(
        risk_level="High"
    ).count()

    medium_risk = JobAnalysis.objects.filter(
        risk_level="Medium"
    ).count()

    low_risk = JobAnalysis.objects.filter(
        risk_level="Low"
    ).count()

    return Response({
        "total_analyses": total_analyses,
        "high_risk": high_risk,
        "medium_risk": medium_risk,
        "low_risk": low_risk
    })