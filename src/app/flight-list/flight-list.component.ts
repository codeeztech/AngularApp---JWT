import { Observable } from "rxjs";
import { FlightService } from "../flight.service";
import { Flight } from "../flight";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { User } from '../_models';
import { Role } from '../role';
import { UserService } from '../_services/user.service'
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  flights: Observable<Flight[]>;
  username: String;
  currenrUserModel: User;
  currentRoleModel: Role;
  isManager = false;

  constructor(private flightService: FlightService, private userService: UserService,
    private rolesService: RolesService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
   // this.validateRole();
  }

  reloadData() {
    this.flights = this.flightService.getflightsList();
  }

  deleteFlight(id: number) {
    this.flightService.deleteflight(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  flightDetails(id: number){
    console.log(id);
    this.router.navigate(['detailsFlight', id]);
  }

  updateFlight(id: number){
    console.log(id);
    this.router.navigate(['updateFlight', id]);
  }

  validateRole(){
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
              this.currentRoleModel = roleData;
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
}
