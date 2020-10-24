import { UsersService } from '../users.service';
import { User } from '../_models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User = new User();
  submitted = false;


  constructor(private userService: UsersService,

    private router: Router) { }

  ngOnInit() {
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User();
  }

  save() {
    this.userService
      .createuser(this.user).subscribe(data => {
        console.log(data)
        this.user = new User();
        this.gotoList();
      },
        error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }


  gotoList() {
    this.router.navigate(['/users']);
  }
}
