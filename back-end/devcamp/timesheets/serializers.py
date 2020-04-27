from rest_framework import serializers
import calendar
from timesheets.models import Task, Project, Timesheet, Day


# TODO timesheets to return all projects? https://riptutorial.com/django-rest-framework/example/30725/getting-list-of-all-related-children-objects-in-parent-s-serializer

class TaskSerializer(serializers.HyperlinkedModelSerializer):
    project_id = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all(), source='projects.id')

    class Meta:
        model = Task
        fields = ('id', 'name', 'project_id')

    def create(self, validated_data):
        subject = Task.objects.create(parent=validated_data['project']['id'], name=validated_data['name'])
        return subject


class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'tasks']
        extra_kwargs = {
            'url': {'view_name': 'project-detail', 'lookup_field': 'pk'},
            'tasks': {"lookup_field": 'pk'}
        }


class DaySerializer(serializers.HyperlinkedModelSerializer):
    timesheet_id = serializers.PrimaryKeyRelatedField(queryset=Timesheet.objects.all(), source='timesheet.id')
    tasks = TaskSerializer(required=True)

    class Meta:
        model = Day
        fields = ( 'id', 'day_date', 'worked_hours', 'tasks', 'timesheet_id')

    def create(self, validated_data):
        day = Day.objects.create(parent=validated_data['timesheet']['id'],
                                    day_date=validated_data['day_date'],
                                    worked_hours=validated_data['worked_hours'],
                                    tasks=validated_data['tasks'])
        return day


class TimesheetSerializer(serializers.HyperlinkedModelSerializer):
    days = DaySerializer(many=True, read_only=True)
    # TODO projects = ProjectSerializer() -> call all projects here somehow
    class Meta:
        model = Timesheet
        fields = ['id', 'is_submitted', 'start_date', 'days']
        extra_kwargs ={
            'url': {'view_name': 'timesheet-detail', 'lookup_field': 'pk'},
            'days': {'lookup_field': 'pk'}
        }

