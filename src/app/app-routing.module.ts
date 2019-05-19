import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PetProfileComponent } from './pet-profile/pet-profile.component';
import { PetCreateComponent } from "./pet-create/pet-create.component";
import { RegisterComponent } from './admin/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'petProfile', component: PetProfileComponent },
  { path: 'petCreate', component: PetCreateComponent },
  { path: 'admin/register', component: RegisterComponent }
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
