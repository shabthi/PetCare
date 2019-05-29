import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PetProfileComponent } from './pet-profile/pet-profile.component';
import { PetCreateComponent } from "./pet-create/pet-create.component";
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './admin/login/login.component';
import { LogoutComponent } from './admin/logout/logout.component';
import { ReportComponent } from './admin/report/report.component';
import { DailyReportComponent } from './admin/reports/daily-report/daily-report.component';
import { RangeReportComponent } from './admin/reports/range-report/range-report.component';
import { RegistrationComponent } from './donation-handling/registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'petProfile', component: PetProfileComponent },
  { path: 'petCreate', component: PetCreateComponent },
  { path: 'admin/register', component: RegisterComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/logout', component: LogoutComponent },
  { path: 'admin/reports', component:ReportComponent},
  { path: 'admin/reports/daily/:date', component:DailyReportComponent},
  { path: 'admin/reports/range/:start/:end', component:RangeReportComponent},
  { path: 'donation-handling/registration' , component:RegistrationComponent},


];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],

  exports: [ RouterModule ]
})
export class AppRoutingModule { }
