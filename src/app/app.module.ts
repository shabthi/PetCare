import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './shared/user.service';
import { ExportService } from './admin/export/export.service';
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
import { MatCardModule, MatRadioModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatPaginatorModule, MatIconModule, MatTooltipModule, MatSnackBarModule, MatTabsModule, MatSortModule, MatTableModule, MatMenuModule, MatDividerModule, MatDialogModule  } from '@angular/material';
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
import { UsersByDayComponent } from './admin/reports/charts/user-by-day/user-by-day.component';
import { SignupComponent } from './signup/signup.component';
import { ItemsComponent } from './inventory/items/items.component';
import { UpdateItemComponent } from './inventory/update-item/update-item.component';
import { SigninComponent } from './signin/signin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DialogProfileUpdateComponent } from './dialog-profile-update/dialog-profile-update.component';

// Auth guard
import { AuthGuard } from './auth/auth.guard';
import { DonationMainpageComponent } from './donation/donation-mainpage/donation-mainpage.component';
import { DonnerRegistrationComponent } from './donation/donner-registration/donner-registration.component';
import { ExportComponent } from './admin/export/export.component';
import { ExportUsersComponent } from './admin/export/export-users/export-users.component';
import { ActiveUsersComponent } from './admin/reports/charts/active-users/active-users.component';
import { ExportPetsComponent } from './admin/export/export-pets/export-pets.component';
import { ItemsNeedComponent } from './inventory/items-need/items-need.component';
import { AddPetPostComponent } from './petPosts/add-pet-post/add-pet-post.component';
import { PetPostsComponent } from './petPosts/pet-posts/pet-posts.component';
import { PetPostService } from './petPosts/pet-post.service';
import { RequestsComponent } from './requests/requests/requests.component';

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
    UsersByDayComponent,
    SignupComponent,
    ItemsComponent,
    UpdateItemComponent,
    SigninComponent,
    DonationMainpageComponent,
    DonnerRegistrationComponent,
    UserProfileComponent,
    DialogProfileUpdateComponent,
    ExportComponent,
    ExportUsersComponent,
    ActiveUsersComponent,
    ItemsNeedComponent,
    PetPostsComponent,
    AddPetPostComponent,
    ExportPetsComponent,
    RequestsComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    ReactiveFormsModule,
    CountUpModule,
    //Angular material modules
    BrowserAnimationsModule, FlexLayoutModule, MatCardModule, MatRadioModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatTooltipModule, MatSnackBarModule, MatTabsModule, MatSortModule, MatTableModule, MatMenuModule, MatPaginatorModule, MatDividerModule, MatDialogModule 
  ],
  providers: [
    PetService,
    InventoryService,
    UserService,
    AuthGuard,
    ExportService,
    PetPostService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogProfileUpdateComponent],
})
export class AppModule { }
