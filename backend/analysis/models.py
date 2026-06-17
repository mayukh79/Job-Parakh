from django.db import models


class JobAnalysis(models.Model):
    class Meta:
        verbose_name_plural = "Job Analyses"

    job_description = models.TextField()

    risk_score = models.IntegerField()

    risk_level = models.CharField(
        max_length=20
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"{self.risk_level} "
            f"({self.risk_score})"
        )