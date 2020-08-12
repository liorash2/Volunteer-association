import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/models/organization';
import { OrgnizationService } from 'src/app/services/orgnization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-organization',
  templateUrl: './manage-organization.component.html',
  styleUrls: ['./manage-organization.component.css']
})
export class ManageOrganizationComponent implements OnInit {
  organizations: Organization[];

  labels: { submitOrganizationError: string, submitOrganizationESuccess: string, editTitle: string } = {
    editTitle: null, submitOrganizationESuccess: null, submitOrganizationError: null
  };
  constructor(private organizationService: OrgnizationService) { }
  isEditOrganization = false;
  isNewOrganization = false;
  organizationForm: FormGroup;
  editOrganizationID: string;
  ngOnInit(): void {
    this.organizationService.organizations.subscribe(res => {
      console.log(res);
      this.organizations = res;
    });

    this.organizationForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      desc: new FormControl(null)
    });
  }


  onToggleOrganization(toShowForm: boolean) {
    this.isNewOrganization = toShowForm;
  }

  cancelEdit() {
    this.isEditOrganization = false;
  }

  OnOrganizationSubmit() {

    if (this.organizationForm.valid) {

      const organization: Organization = new Organization();
      organization.name = this.organizationForm.value.name;
      organization.desc = this.organizationForm.value.desc;

      if (this.isEditOrganization) {
        organization._id = this.editOrganizationID;
        this.organizationService.updateOrganization(organization).subscribe(res => {
          this.printSuccess('Organization ' + organization.name + ' was updated successfully');
        }, err => {
          this.printErrMsg('Failed to update organization');
        });

      }
    }

  }
  private printSuccess(msg: string) {
    this.labels.submitOrganizationESuccess = msg;
    this.hideMessageTimeout();
  }
  private printErrMsg(msg: string) {
    this.labels.submitOrganizationError = msg;
    this.hideMessageTimeout();
  }
  private hideMessageTimeout() {
    setTimeout(() => {
      this.labels.submitOrganizationError = null;
      this.labels.submitOrganizationESuccess = null;
    }, 2500);
  }
  EditOrganization(organization: Organization) {
    //console.log('edit0');
    this.isEditOrganization = true;
    this.isNewOrganization = false;
    this.editOrganizationID = organization._id;
    this.organizationForm.reset();
    this.labels.editTitle = 'Edit Organization: ' + organization.name;
    this.organizationForm.setValue({
      name: organization.name,
      desc: organization.desc
    });

  }
}
