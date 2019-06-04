import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { PetProfileComponent } from './pet-profile/pet-profile.component';
import { AdminComponent } from './admin/admin/admin.component';
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './admin/login/login.component';
import { LogoutComponent } from './admin/logout/logout.component';
import { ReportComponent } from './admin/report/report.component';

//Angular material modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatRadioModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DailyReportComponent } from './admin/reports/daily-report/daily-report.component';
import { AdoptionsByDayComponent } from './admin/reports/charts/adoptions-by-day/adoptions-by-day.component';
import { ChartsComponent } from './admin/reports/charts/charts.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { RequestsByDayComponent } from './admin/reports/charts/requests-by-day/requests-by-day.component';
import { PetsByDayComponent } from './admin/reports/charts/pets-by-day/pets-by-day.component';
import { RangeReportComponent } from './admin/reports/range-report/range-report.component';

import {PetService}from './shared/pet.service';
import { PetCreateComponent } from './pet-create/pet-create.component';
import { RegistrationComponent } from './donation-handling/registration/registration.component';
import { MainpageComponent } from './donation-handling/mainpage/mainpage.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    PetProfileComponent,
    AdminComponent,
    RegisterComponent,
    PetCreateComponent,
    LoginComponent,
    LogoutComponent,
    ReportComponent,
    DailyReportComponent,
    AdoptionsByDayComponent,
    ChartsComponent,
    RequestsByDayComponent,
    PetsByDayComponent,
    RangeReportComponent,
    RegistrationComponent,
    MainpageComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    //Angular material modules
    BrowserAnimationsModule, FlexLayoutModule, MatCardModule, MatRadioModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule
  ],
  providers: [PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
