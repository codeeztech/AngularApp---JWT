import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './_services/user.service'
import { User } from './_models';
import { Role } from './role';
import { RolesService } from './roles.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TPConnects Test App';

  username: String;
  currenrUserModel: User;
  currentRoleModel: Role;
  isManager = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private rolesService: RolesService,

  ) {
  }

  ngOnInit() {
    this.validateRole();
  }

  validateRole() {
    this.isManager = false;
    this.username = sessionStorage.getItem('loggedUser');
    console.log("logged User : " + this.username);


    this.userService.getCurrentUser(this.username)
      .subscribe(data => {
        this.currenrUserModel = data;
        console.log("currenrUserModel :" + this.currenrUserModel)

        if (this.currenrUserModel !== null) {

          this.rolesService.getRole(this.currenrUserModel.roleId)
            .subscribe(roleData => {
              this.currentRoleModel = roleData[0];
              console.log("currenrRoleModel :" + this.currentRoleModel)

              if (this.currentRoleModel !== null) {
                if (this.currentRoleModel.roleName === "Manager") {
                  this.isManager = true;
                  console.log("IsManager Login: " + this.isManager);
                  this.router.navigate(['/flights']);
                }
                else {
                  this.isManager = false;
                  console.log("IsManager Login: " + this.isManager);
                  this.router.navigate(['/flights']);
                }
              }
              else {
                this.isManager = false;
                console.log("Role model is null");
              }
            });
        }
      }, error => console.log(error));
  }
  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    this.isManager = false;
    localStorage.removeItem('token');
    sessionStorage.removeItem('loggedUser');
    this.router.navigate(['/login'])
  }
}
