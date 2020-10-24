import { Role } from '../role';
import { Component, OnInit, Input } from '@angular/core';
import { RolesService } from '../roles.service';
import { RoleListComponent } from '../role-list/role-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {

  id: string;
  role: Role;

  constructor(private route: ActivatedRoute,private router: Router,
    private rolesService: RolesService) { }

  ngOnInit() {
    this.role = new Role();

    this.id = this.route.snapshot.params['id'];

    console.log("role detail id: "+ this.id);
    
    this.rolesService.getRole(this.id)
      .subscribe(data => {
        this.role = data[0];
        console.log(this.role)
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['roles']);
  }


}
