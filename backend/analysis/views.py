# pyrefly: ignore [missing-import]
from rest_framework.decorators import api_view
# pyrefly: ignore [missing-import]
from rest_framework.response import Response
from .models import JobAnalysis
from .serializers import JobAnalysisSerializer
from .file_parser import extract_text
from ml.predict import predict_job
from .explainer import generate_explanation
from .verifier import verify_source
from django.db.models import Count, Avg
import traceback
# pyrefly: ignore [missing-import]
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
    try:
        uploaded_file = request.FILES.get("file")

        if uploaded_file:
            text = extract_text(uploaded_file).lower()
        else:
            text = request.data.get("job_description", "").lower()
        if not text.strip():
            return Response(
            {
                "error": "No text could be extracted from the uploaded file."
            },
            status=400,)
        ml_result = predict_job(text)
        verification_warnings = verify_source(text)
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
                reasons.append("No suspicious patterns detected")

            rule_score = score

            if ml_result["prediction"] == 1:
              score = int(rule_score * 0.7 + ml_result["confidence"] * 0.3)
            
            else:
              score = rule_score

            score = min(score, 100)

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
            explanation = generate_explanation(reasons, level)
            highlighted_text = text

        for keyword in SUSPICIOUS_KEYWORDS:
             highlighted_text = highlighted_text.replace(
            keyword,
            f"<mark>{keyword}</mark>"
        )

        for pattern in SUSPICIOUS_CONTACT_PATTERNS:
            highlighted_text = highlighted_text.replace(
            pattern,
            f"<mark>{pattern}</mark>"
        )
    except Exception as e:
        traceback.print_exc()
        return Response(
            {
                "error": str(e),
                "type": type(e).__name__,
            },
            status=500,
        )

@api_view(["GET"])
def analysis_history(request):
    try:
        analyses = JobAnalysis.objects.all().order_by("-created_at")
        serializer = JobAnalysisSerializer(analyses, many=True)
        return Response(serializer.data)
    except Exception as e:
        traceback.print_exc()
        return Response(
            {
                "error": str(e),
                "type": type(e).__name__,
            },
            status=500,
        )

@api_view(['GET', 'DELETE'])
def analysis_detail(request, analysis_id):

    analysis = get_object_or_404(
        JobAnalysis,
        id=analysis_id
    )

    if request.method == 'GET':
        serializer = JobAnalysisSerializer(analysis)
        return Response(serializer.data)

    analysis.delete()
    return Response(
        {"message": "Analysis deleted successfully."},
        status=204
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

    recent = JobAnalysis.objects.order_by("-created_at")[:5]

    average_risk = JobAnalysis.objects.aggregate(
        avg=Avg("risk_score")
    )["avg"] or 0

    average_trust = 100 - average_risk

    financial_cases = 0
    pressure_cases = 0
    contact_cases = 0

    for item in JobAnalysis.objects.all():
        text = item.job_description.lower()

        if any(k in text for k in FINANCIAL_SCAM_KEYWORDS):
            financial_cases += 1

        if any(k in text for k in PRESSURE_TACTIC_KEYWORDS):
            pressure_cases += 1

        if any(k in text for k in SUSPICIOUS_CONTACT_PATTERNS):
            contact_cases += 1

    return Response({
        "total_analyses": total_analyses,
        "high_risk": high_risk,
        "medium_risk": medium_risk,
        "low_risk": low_risk,

        "average_risk": round(average_risk, 2),
        "average_trust": round(average_trust, 2),

        "category_stats": {
            "financial": financial_cases,
            "pressure": pressure_cases,
            "contact": contact_cases,
        },

        "recent": [
            {
                "id": item.id,
                "risk_level": item.risk_level,
                "risk_score": item.risk_score,
                "created_at": item.created_at,
            }
            for item in recent
        ]
    })