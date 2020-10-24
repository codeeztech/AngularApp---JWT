import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RoleDetailComponent } from './role-detail/role-detail.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { RoleListComponent } from './role-list/role-list.component';
import { UpdateRoleComponent } from './update-role/update-role.component';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateUserComponent } from './update-user/update-user.component';

import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { CreateFlightComponent } from './create-flight/create-flight.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { UpdateFlightComponent } from './update-flight/update-flight.component';


import { LoginComponent } from './login';
import { AuthGuard } from './auth.guard';



const routes: Routes = [

  { path: '', redirectTo: 'flights', pathMatch: 'full' },
  { path: 'flights', component: FlightListComponent },
  { path: 'addFlight', component: CreateFlightComponent  },
  { path: 'updateFlight/:id', component: UpdateFlightComponent },
  { path: 'detailsFlight/:id', component: FlightDetailComponent },


  //{ path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'users', component: UserListComponent , canActivate:[AuthGuard] },
  { path: 'addUser', component: CreateUserComponent  , canActivate:[AuthGuard] },
  { path: 'updateUser/:id', component: UpdateUserComponent , canActivate:[AuthGuard] },
  { path: 'detailsUser/:id', component: UserDetailComponent , canActivate:[AuthGuard] },
  { path: 'deleteUser/:id', component: UserListComponent , canActivate:[AuthGuard] },

  //{ path: '', redirectTo: 'role', pathMatch: 'full' },
  { path: 'roles', component: RoleListComponent , canActivate:[AuthGuard] },
  { path: 'addRole', component: CreateRoleComponent , canActivate:[AuthGuard] },
  { path: 'updateRole/:id', component: UpdateRoleComponent , canActivate:[AuthGuard] },
  { path: 'detailsRole/:id', component: RoleDetailComponent , canActivate:[AuthGuard] },
  { path: 'deleteRole/:id', component: RoleListComponent , canActivate:[AuthGuard] },

  { path: 'login', component: LoginComponent },
    // otherwise redirect to flights list
  { path: '**', redirectTo: '' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
