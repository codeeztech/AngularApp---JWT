import { RolesService } from '../roles.service';
import { Role } from '../role';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  role: Role = new Role();
  submitted = false;
  

  constructor(private roleService: RolesService,

    private router: Router) { }

  ngOnInit() {
  }

  newRole(): void {
    this.submitted = false;
    this.role = new Role();
  }

  save() {
    this.roleService
    .createRole(this.role).subscribe(data => {
      console.log(data)
      this.role = new Role();
      this.gotoList();
    }, 
    error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  
  gotoList() {
    this.router.navigate(['/roles']);
  }

}
