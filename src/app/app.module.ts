import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddTimesheetComponent } from './components/timesheet/add-timesheet/add-timesheet.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TimesheetsForDayComponent } from './components/timesheet/timesheets-for-day/timesheets-for-day.component';
import { MainGuard } from './guards/main.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddTimesheetComponent,
    DashboardComponent,
    TimesheetsForDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MainGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
