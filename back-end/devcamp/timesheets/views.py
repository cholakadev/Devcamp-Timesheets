import datetime
import json

from django.http import Http404, JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from timesheets.models import Timesheet, Day, Task, Project
from timesheets.serializers import TimesheetSerializer, DaySerializer, TaskSerializer, ProjectSerializer


class CreateTimesheetView(APIView):
    def fetch_week_and_monday(week_num, this_year, adjust, a):
        week_num = str((int)(week_num) + adjust)
        monday = datetime.datetime.strptime(f'{this_year}-W{int(week_num) - 1}-1', "%Y-W%W-%w").date()
        monday = str(monday)

        week_obj = {"week": week_num, "monday": monday}
        return week_obj

    def get(self, request, format=None):
        today = datetime.date.today()
        # week_num = today.strftime("%V")
        # this_year = datetime.date.today().strftime("%Y")
        # first_week = self.fetch_week_and_monday(week_num, this_year, -4)
        # second_week = self.fetch_week_and_monday(week_num, this_year, -3)
        # third_week = self.fetch_week_and_monday(week_num, this_year, -2)
        # fourth_week = self.fetch_week_and_monday(week_num, this_year, -1)
        # now_week = self.fetch_week_and_monday(week_num, this_year, 0)
        # sixth_week = self.fetch_week_and_monday(week_num, this_year, 1)
        # seventh_week = self.fetch_week_and_monday(week_num, this_year, 2)
        # eight_week = self.fetch_week_and_monday(week_num, this_year, 3)
        # ninth_week = self.fetch_week_and_monday(week_num, this_year, 4)
        #
        # result = []
        #
        # result.append(first_week)
        # result.append(second_week)
        # result.append(third_week)
        # result.append(fourth_week)
        # result.append(now_week)
        # result.append(sixth_week)
        # result.append(seventh_week)
        # result.append(eight_week)
        # result.append(ninth_week)

        # result = [
        #     {'week_start': "2020-04-20",
        #      'selected': False},
        #     {'week_start': "2020-04-21",
        #      'selected': False},
        #     {'week_start': "2020-04-22",
        #      'selected': False},
        #     {'week_start': "2020-04-23",
        #      'selected': True},
        #     {'week_start': "2020-04-24",
        #      'selected': False},
        #     {'week_start': "2020-04-25",
        #      'selected': False},
        #     {'week_start': "2020-04-26",
        #      'selected': False},
        # ]

        weeks = []
        today = datetime.date.today()
        diff_to_monday = today.weekday()
        this_week_monday = today + datetime.timedelta(days=-diff_to_monday)
        prev_week = this_week_monday + datetime.timedelta(days=-7)

        for i in range(3):
            week = {'week_start': prev_week.strftime('%Y-%m-%d'),
                    'selected': False}
            weeks.insert(0, week)
            prev_week = prev_week + datetime.timedelta(days=-7)

        weeks.append({'week_start': this_week_monday.strftime('%Y-%m-%d'),
                      'selected': True})

        next_week = today + datetime.timedelta(days=7)

        for i in range(3):
            week = {'week_start': next_week.strftime('%Y-%m-%d'),
                    'selected': False}
            weeks.append(week)
            next_week = next_week + datetime.timedelta(days=7)

        return Response(weeks, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = TimesheetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            timesheet_id = serializer.data.get('id')
            start_date = request.data.get('start_date')
            timesheet = Timesheet.objects.get(pk=timesheet_id)
            task = Task.objects.get(pk=1)
            for i in range(5):
                d = Day(day_date=start_date, tasks=task, timesheet=timesheet)
                d.save()

            timesheet.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TimesheetsList(APIView):

    def get(self, request, format=None):
        timesheet = Timesheet.objects.all().order_by("is_submitted", "-start_date")
        serializer = TimesheetSerializer(timesheet, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TimesheetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TimesheetDetails(APIView):

    def get_object(self, pk):
        try:
            return Timesheet.objects.get(pk=pk)
        except Timesheet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        timesheet = self.get_object(pk)
        serializer = TimesheetSerializer(timesheet, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        timesheet = self.get_object(pk)
        serializer = TimesheetsList(timesheet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        timesheet = self.get_object(pk)
        timesheet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TimesheetDaysList(APIView):

    def get_object(self, pk):
        try:
            timesheet = Timesheet.objects.get(pk=pk)
            return Day.objects.filter(timesheet=timesheet)
        except Day.DoesNotExist or Timesheet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        day = self.get_object(pk)
        serializer = DaySerializer(day, many=True)
        return Response(serializer.data)


class DayDetails(APIView):

    def get_object(self, pk):
        try:
            return Day.objects.get(pk=pk)
        except Day.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        day = self.get_object(pk)
        serializer = DaySerializer(day, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        day = self.get_object(pk)
        serializer = DaySerializer(day, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        day = self.get_object(pk)
        day.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskDetails(APIView):

    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        task = self.get_object(pk)
        serializer = TaskSerializer(task, context={'request': request})
        return Response(serializer.data)


class TaskList(APIView):
    def get(self, request, format=None):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)


class ProjectList(APIView):
    def get(self, request, format=None):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)


class ProjectDetails(APIView):
    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        project = self.get_object(pk)
        serializer = ProjectSerializer(project, context={'request': request})
        return Response(serializer.data)


class TimesheetSubmit(APIView):

    def get_object(self, pk):
        try:
            return Timesheet.objects.get(pk=pk)
        except Day.DoesNotExist or Timesheet.DoesNotExist:
            raise Http404

    def post(self, request, pk, format=None):
        timesheet = self.get_object(pk)
        timesheet.is_submitted = True
        timesheet.save()
        serializer = TimesheetSerializer(timesheet)
        return Response(serializer.data)