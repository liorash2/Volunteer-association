import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Organization } from 'src/app/models/organization';
import { OrgnizationService } from 'src/app/services/orgnization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-user, [app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: User;
  @Input() organizations: Organization[] = [];
  @Output() EditUserClicked = new EventEmitter<User>();
  selectedRole: string;


  roles: { key: string, name: string }[];

  edit = false;
  constructor(private userService: UsersService, private organizationService: OrgnizationService) { }

  ngOnInit(): void {
    this.roles = this.userService.getRoles();
    this.selectedRole = this.user.role;

  }
  getRoleName(role: string) {
    return this.userService.getRoleName(role);
  }
  editUser() {
    this.EditUserClicked.emit(this.user);
  }
  cancelEdit() {
    this.EditUserClicked.emit(null);
  }
  saveUser() {

  }
  getOrganization(organizationID: string): string {
    if (organizationID && organizationID !== '' && this.organizations && this.organizations.length) {
      const organizationObj = this.organizations.find(o => o._id === organizationID);
      if (organizationObj) {
        return organizationObj.name;
      }
    }
    return '';
  }
}
