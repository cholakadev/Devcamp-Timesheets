import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTimesheetComponent } from './views/create-timesheet/create-timesheet/create-timesheet.component';
import { AllTimesheetsComponent } from './views/all-timesheets/all-timesheets/all-timesheets.component';
import { EditTimesheetComponent } from './views/edit-timesheet/edit-timesheet/edit-timesheet.component';
import { AuthComponent } from './views/auth/auth/auth.component';

const routes: Routes = [
  {
    path: 'timesheets/create',
    component: CreateTimesheetComponent
  },
  {
    path: 'timesheets',
    component: AllTimesheetsComponent
  },
  {
    path: 'timesheets/:id/edit',
    component: EditTimesheetComponent
  },
  {
    path: 'login',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
