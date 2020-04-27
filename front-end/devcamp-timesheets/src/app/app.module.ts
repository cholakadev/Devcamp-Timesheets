import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateTimesheetComponent } from './views/create-timesheet/create-timesheet/create-timesheet.component';
import { AllTimesheetsComponent } from './views/all-timesheets/all-timesheets/all-timesheets.component';
import { EditTimesheetComponent } from './views/edit-timesheet/edit-timesheet/edit-timesheet.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './views/auth/auth/auth.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    AppComponent,
    CreateTimesheetComponent,
    AllTimesheetsComponent,
    EditTimesheetComponent,
    AuthComponent,
  ],
    imports: [
        [ModalModule.forRoot()],
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        ButtonsModule,
        AlertModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
