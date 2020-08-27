import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Organization } from 'src/app/models/organization';

import { OrgnizationService } from 'src/app/services/orgnization.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: User[];
  newUserForm: FormGroup;
  newOrganization: FormGroup;
  roles: { name: string, key: string }[] = [];
  organizations: Organization[] = null;
  newUserMode = false;
  editUserMode = false;
  selectedRole: string;

  userFromLabels: { opErr: string, opSuccess: string, editTitle: string } = { editTitle: null, opErr: null, opSuccess: null };
  modalRef: BsModalRef;


  constructor(private userService: UsersService, private organizationService: OrgnizationService,
    private formBuilder: FormBuilder, private modalService: BsModalService) { }

  ngOnInit(): void {

    this.roles = this.userService.getRoles();
    this.newUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      role: ['', [Validators.required]],
      organization: ['', []]
    });

    this.newUserForm.get('role').valueChanges.subscribe(r => {
      if (r === 'organization') {
        this.newUserForm.get('organization').setValidators(Validators.required);
      } else {
        this.newUserForm.get('organization').setValidators(null);
      }
    });
    this.newOrganization = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      desc: ['', []]
    });
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.organizationService.organizations.subscribe(o => {
      this.organizations = o;
      if (this.organizations.length) {
        this.newUserForm.get('organization').setValue(this.organizations[0]._id);
      }
    });

  }
  OnAddUserSubmit() {
    console.log(this.newUserForm.valid);
    if (this.newUserForm.valid) {
      const formUser = new User(
        this.newUserForm.value.firstName,
        this.newUserForm.value.lastName,
        this.newUserForm.value.email,
        this.newUserForm.value.password,
        this.newUserForm.value.role,
        this.newUserForm.value.organization,
        null
      );
      if (this.editUserMode) {
        formUser._id = this.newUserForm.value.password;
        this.userService.updateUser(formUser).subscribe(r => {
          if (r) {
            this.userFromLabels.opSuccess = 'User Successfully updated';
          } else {
            this.userFromLabels.opErr = 'Failed To Update User';
          }
          setTimeout(() => {
            this.userFromLabels.opSuccess = null;
            this.userFromLabels.opErr = null;
          }, 3000);
        }, err => {
          this.userFromLabels.opErr = err.error;
          setTimeout(() => {
            this.userFromLabels.opSuccess = null;
            this.userFromLabels.opErr = null;
          }, 3000);
        }
        );
      } else {

      }

    }

  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }
  onCreateOrganization() {
    const organizationToAdd = new Organization();
    organizationToAdd.desc = this.newOrganization.value.desc || '';
    organizationToAdd.name = this.newOrganization.value.name;

    this.organizationService.createOrganization(organizationToAdd).subscribe(o => {
      if (o) {
        this.organizations.push(o);
        this.newOrganization.reset();
        this.modalRef.hide();
        this.newUserForm.get('organization').setValue(o._id);
      }
    });

  }
  onToggleUser(state: boolean) {
    this.editUserMode = false;
    if (state) {
      this.newUserForm.reset();
      this.newUserForm.get('password').setValidators([Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]);
    }
    this.newUserMode = state;
  }
  onEditUserEvent(user: User) {
    this.newUserMode = false;
    this.newUserForm.reset();
    if (!user) {
      this.editUserMode = false;
      return;
    }
    this.editUserMode = true;
    this.userFromLabels.editTitle = `Edit User ${user.first_name} ${user.last_name}`;

    // remove password validator
    this.newUserForm.get('password').setValidators([]);
    this.newUserForm.setValue({
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      organization: user.organizationID || '',
      role: user.role,
      password: user._id
    });
  }

  cancelEdit() {
    this.editUserMode = false;
  }

}
