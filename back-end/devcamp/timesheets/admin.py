from django.contrib import admin

from timesheets.models import Project, Task, Timesheet, Day, User

admin.site.register(Task)
admin.site.register(Project)
admin.site.register(Day)
admin.site.register(Timesheet)
admin.site.register(User)
