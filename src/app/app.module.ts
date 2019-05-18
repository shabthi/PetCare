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
import { MatCardModule, MatRadioModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DailyReportComponent } from './admin/reports/daily-report/daily-report.component';

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
    LoginComponent,
    LogoutComponent,
    ReportComponent,
    DailyReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    //Angular material modules
    BrowserAnimationsModule, FlexLayoutModule, MatCardModule, MatRadioModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
