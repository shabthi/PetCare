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
import { AddItemComponent } from './inventory/add-item/add-item.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { ItemsComponent } from './inventory/items/items.component';
import { UpdateItemComponent } from './inventory/update-item/update-item.component';
import { SigninComponent } from './signin/signin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ItemsNeedComponent } from './inventory/items-need/items-need.component';
import { AddPetPostComponent } from './petPosts/add-pet-post/add-pet-post.component';
import { PetPostsComponent } from './petPosts/pet-posts/pet-posts.component';

import { AuthGuard } from './auth/auth.guard';
import { DonationMainpageComponent } from './donation/donation-mainpage/donation-mainpage.component';
import { DonnerRegistrationComponent } from './donation/donner-registration/donner-registration.component';
import { ExportComponent } from './admin/export/export.component';
import { RequestsComponent } from './requests/requests/requests.component';

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
  { path: 'admin/dashboard', component:DashboardComponent},
  { path: 'admin/export', component:ExportComponent},
  { path: 'admin/reports/daily/:date', component:DailyReportComponent},
  { path: 'admin/reports/range/:start/:end', component:RangeReportComponent},
  { path: 'addItem', component:AddItemComponent},
  { path: 'items' , component:ItemsComponent},
  { path: 'updateItem/:id' , component:UpdateItemComponent},
  { path: 'itemsNeed' , component:ItemsNeedComponent},
  { path: 'addPetPost', component:AddPetPostComponent},
  { path: 'petPosts', component:PetPostsComponent},

  { path: 'signup', component:SignupComponent},
  { path: 'signin', component:SigninComponent},
  { path: 'donationmainpage', component:DonationMainpageComponent},
  { path: 'donnerregistration', component:DonnerRegistrationComponent},
  { path: 'myProfile', component:UserProfileComponent, canActivate:[AuthGuard]},
  { path: 'requests', component:RequestsComponent, canActivate:[AuthGuard]},

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
