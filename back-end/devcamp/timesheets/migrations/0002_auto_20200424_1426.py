# Generated by Django 3.0.5 on 2020-04-24 11:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('timesheets', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='timesheets',
        ),
        migrations.AddField(
            model_name='timesheet',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='timesheets.User'),
        ),
    ]