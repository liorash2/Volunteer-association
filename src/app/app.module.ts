import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ManageUsersComponent } from './users/manage-users/manage-users.component';
import { ManageOrganizationComponent } from './users/manage-organization/manage-organization.component';
import { UserComponent } from './users/manage-users/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditComponent } from './users/manage-organization/edit/edit.component';
import { RegisterComponent } from './register/register.component';
import { RegisterVolunteerComponent } from './register-volunteer/register-volunteer.component';
import { RegisterOrganizationComponent } from './register-organization/register-organization.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    HomeComponent,
    ManageUsersComponent,
    ManageOrganizationComponent,
    UserComponent,
    EditComponent,
    RegisterComponent,
    RegisterVolunteerComponent,
    RegisterOrganizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
