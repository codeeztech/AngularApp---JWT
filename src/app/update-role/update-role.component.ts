import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {

  id: string;
  role: Role;
  submitted = false;

  constructor(private route: ActivatedRoute,private router: Router,
    private roleService: RolesService) { }

  ngOnInit() {
    this.role = new Role();

    this.id = this.route.snapshot.params['id'];
    
    this.roleService.getRole(this.id)
      .subscribe(data => {
        console.log(data)
        this.role = data[0];
      }, error => console.log(error));
  }

  updateRole() {
    this.roleService.updateRole(this.id, this.role)
      .subscribe(data => {
        console.log(data);
        this.role = new Role();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateRole();    
  }

  
  gotoList() {
    this.router.navigate(['/roles']);
  }

}
