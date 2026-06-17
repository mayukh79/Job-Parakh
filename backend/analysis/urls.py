from django.urls import path

from .views import (
    analyze_job,
    analysis_history,
    analysis_detail,
    analysis_stats
)

urlpatterns = [
    path('analyze/', analyze_job),
    path('history/', analysis_history),
    path('history/<int:analysis_id>/', analysis_detail),
    path('stats/', analysis_stats)
]