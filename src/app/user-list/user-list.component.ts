import { UserDetailComponent } from '../user-detail/user-detail.component';
import { Observable } from "rxjs";
import { UsersService } from "../users.service";
import { User } from "../_models/user";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private userService: UsersService,
    private rolesService: RolesService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.userService.getusersList().subscribe(
      res => {
        this.users = res
      },
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(["/login"])
          }
        }
      }
    );
  }

  deleteUser(id: number) {
    this.userService.deleteuser(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  userDetails(id: number){
    console.log(id);
    this.router.navigate(['detailsUser', id]);
  }

  updateUser(id: number){
    console.log(id);
    this.router.navigate(['updateUser', id]);
  }

}
