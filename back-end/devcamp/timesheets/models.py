from django.db import models
from django.contrib.auth.models import User as UserGlobal


class Project(models.Model):
    name = models.CharField(max_length=50, null=False)

    def __str__(self):
        return f'{self.name}'


class Task(models.Model):
    name = models.CharField(max_length=50, null=False)
    projects = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f'{self.name}'


class User(models.Model):
    email = models.CharField(max_length=50, unique=True, null=False)
    password = models.CharField(max_length=20, null=False)

    def __str__(self):
        return f'{self.email}'


class Timesheet(models.Model):
    is_submitted = models.BooleanField(default=False)
    start_date = models.DateField(null=False)
    user = models.ForeignKey(UserGlobal, default=1, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.start_date}'


class Day(models.Model):
    day_date = models.DateField(null=False)
    worked_hours = models.DecimalField(null=True, max_digits=5, decimal_places=1)
    tasks = models.ForeignKey(Task, on_delete=models.CASCADE, null=False)
    timesheet = models.ForeignKey(Timesheet, on_delete=models.CASCADE, null=False, related_name='days')

    def __str__(self):
        return f'{self.day_date}'
