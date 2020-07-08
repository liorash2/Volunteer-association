import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './models/user';
import { UsersService } from './services/users.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'volunteers-association';
  user: User;
  userSub: Subscription;

  constructor(private usersService: UsersService, private route: Router) {
  }
  ngOnInit() {
    this.userSub = this.usersService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  hasPermission(url: string): boolean {
    if (this.user) {
      return this.usersService.hasPermission(url);
    }
    return false;
  }

  logout(){
    this.usersService.logoutUser();
    this.route.navigate(['/']);
  }
}
