import { Volunteer } from './../models/volunteer';
import { Organization } from './../models/organization';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import { VolunteerService } from '../services/volunteer.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: User;
  userSub: Subscription;
  organizations: Organization[];
  volunteers: Volunteer[];
  registerSuccessMsg: boolean;
  constructor(private userService: UsersService, private volunteerService: VolunteerService) { }

  ngOnInit(): void {
    this.userSub = this.userService.user.subscribe(user => {
      this.user = user;
      this.getAvailOrganizations();
    });
  }
  getAvailOrganizations() {
    if(this.user)
    {
      if (this.user.role === "volunteer") {
        let volun = this.user.obj as Volunteer;
        if (volun) {
          this.volunteerService.getAvailableOrganization(volun).subscribe(org => {
            ;
            this.organizations = org;
            console.log(this.organizations)
          });
        }
      }
    }

  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  applyToOrg(orgid: string) {
    if (this.user && orgid) {
      let volun = this.user.obj as Volunteer;
      this.volunteerService.registerToOrganization(volun, orgid).subscribe(suc => {
        if (suc) {
          this.registerSuccessMsg = true;
        }

      }, err => {
        alert(err.error.error);
      })
    }
  }
}
