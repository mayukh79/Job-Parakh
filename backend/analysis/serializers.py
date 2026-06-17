from rest_framework import serializers

from .models import JobAnalysis


class JobAnalysisSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobAnalysis

        fields = [
            "id",
            "job_description",
            "risk_score",
            "risk_level",
            "created_at"
        ]