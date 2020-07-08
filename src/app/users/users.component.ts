import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  user: User;
  userSub: Subscription;


  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userSub = this.userService.user.subscribe(u => this.user = u);
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
