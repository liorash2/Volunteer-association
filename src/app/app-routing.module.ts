import { RegisterVolunteerComponent } from './register-volunteer/register-volunteer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { CanActivateService, CanActivateLogin } from './services/can-activate.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RegisterOrganizationComponent } from './register-organization/register-organization.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [CanActivateLogin] },
  { path: 'users', component: UsersComponent, canActivate: [CanActivateService] },
  { path: 'register', component: RegisterComponent },
  { path: 'register-volunteer', component: RegisterVolunteerComponent },
  { path: 'register-organization', component: RegisterOrganizationComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
