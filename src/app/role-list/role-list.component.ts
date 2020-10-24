import { RoleDetailComponent } from '../role-detail/role-detail.component';
import { Observable } from "rxjs";
import { RolesService } from "../roles.service";
import { Role } from "../role";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: Observable<Role[]>;

  constructor(private roleService: RolesService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.roles = this.roleService.getrolesList();
  }

  deleteRole(id: string) {
    this.roleService.deleteRole(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  roleDetails(id: string){
    console.log(id);
    this.router.navigate(['detailsRole', id]);
  }

  updateRole(id: string){
    console.log(id);
    this.router.navigate(['updateRole', id]);
  }
}
