import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './shared/user.service';

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
import { MatCardModule, MatRadioModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatTooltipModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DailyReportComponent } from './admin/reports/daily-report/daily-report.component';
import { AdoptionsByDayComponent } from './admin/reports/charts/adoptions-by-day/adoptions-by-day.component';
import { ChartsComponent } from './admin/reports/charts/charts.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { CountUpModule } from 'countup.js-angular2';

import { RequestsByDayComponent } from './admin/reports/charts/requests-by-day/requests-by-day.component';
import { PetsByDayComponent } from './admin/reports/charts/pets-by-day/pets-by-day.component';
import { RangeReportComponent } from './admin/reports/range-report/range-report.component';
import {PetService}from './shared/pet.service';
import { PetCreateComponent } from './pet-create/pet-create.component';
import { AddItemComponent } from './inventory/add-item/add-item.component';
import { InventoryService } from './inventory/inventory.service';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { ItemsComponent } from './inventory/items/items.component';
import { UpdateItemComponent } from './inventory/update-item/update-item.component';
import { SigninComponent } from './signin/signin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

// Auth guard
import { AuthGuard } from './auth/auth.guard';

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
    AddItemComponent,
    DashboardComponent,
    SignupComponent,
    ItemsComponent,
    UpdateItemComponent,
    SigninComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    ReactiveFormsModule,
    CountUpModule,
    //Angular material modules
    BrowserAnimationsModule, FlexLayoutModule, MatCardModule, MatRadioModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatTooltipModule, MatSnackBarModule
  ],
  providers: [
    PetService,
    InventoryService,
    UserService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
