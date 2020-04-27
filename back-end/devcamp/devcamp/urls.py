"""devcamp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from timesheets import views

urlpatterns = [
    path('admin', admin.site.urls),
    path('timesheets/all', views.TimesheetsList.as_view()),
    path('timesheets/create', views.CreateTimesheetView.as_view()),
    path('timesheets/<int:pk>/submit', views.TimesheetSubmit.as_view()),
    path('timesheets/<int:pk>', views.TimesheetDetails.as_view(), name="timesheet-detail"),
    path('timesheets/<int:pk>/days', views.TimesheetDaysList.as_view()),
    path('tasks/', views.TaskList.as_view()),
    path('tasks/<int:pk>', views.TaskDetails.as_view(), name="task-detail"),
    path('projects', views.ProjectList.as_view()),
    path('projects/<int:pk>', views.ProjectDetails.as_view(), name="project-detail"),
    path('days/<int:pk>', views.DayDetails.as_view(), name="day-detail"),
]
