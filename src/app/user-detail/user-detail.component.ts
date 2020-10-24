import { User } from '../_models/user';
import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users.service';
import { UserListComponent } from '../user-list/user-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id: number;
  user: User;

  constructor(private route: ActivatedRoute,private router: Router,
    private usersService: UsersService) { }

  ngOnInit() {
    this.user = new User();

    this.id = this.route.snapshot.params['id'];

    console.log("user detail id: "+ this.id);
    
    this.usersService.getuser(this.id)
      .subscribe(data => {
        this.user = data;
        console.log(this.user)
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['users']);
  }

}
