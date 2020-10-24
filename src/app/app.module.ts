import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthenticationService } from './_services/authentication.service'
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { UpdateFlightComponent } from './update-flight/update-flight.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { UpdateRoleComponent } from './update-role/update-role.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { AuthGuard } from './auth.guard';
import { FlightService } from './flight.service';
import { RolesService } from './roles.service';
import { TokenInterceptorService } from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateFlightComponent,
    FlightDetailComponent,
    FlightListComponent,
    UpdateFlightComponent,
    LoginComponent,
    UserListComponent,
    CreateUserComponent,
    UpdateUserComponent,
    UserDetailComponent,
    RoleListComponent,
    RoleDetailComponent,
    UpdateRoleComponent,
    CreateRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ 
    AuthenticationService,
    AuthGuard,
    FlightService,
    RolesService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
