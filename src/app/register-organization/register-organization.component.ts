import { Organization } from 'src/app/models/organization';
import { Region } from './../models/Region';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hobby } from '../models/Hobby';
import { OrgnizationService } from '../services/orgnization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.css']
})
export class RegisterOrganizationComponent implements OnInit {
  newOrgForm: FormGroup;
  hobbies: Hobby[];
  regions: Region[];
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private orgnizationService: OrgnizationService, private router: Router) { }

  ngOnInit(): void {
    this.newOrgForm = this.formBuilder.group({
      orgName: ['', [Validators.required]],
      orgDesc: [''],
      orgEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      orgPhone: ['', [Validators.required]],
      orgMax: [1, [Validators.required]],
      orgHobby: ['', [Validators.required]],
      orgRegion: ['', [Validators.required]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.apiService.getHobbies()
      .subscribe(response => {
        this.hobbies = response;
      });
    this.apiService.getRegions()
      .subscribe(response => {
        this.regions = response;
      });
  }
  buildOrgReq(): Organization {
    const org = new Organization();
    org.name = this.newOrgForm.get("orgName").value;
    org.desc = this.newOrgForm.get("orgDesc").value;
    org.email = this.newOrgForm.get("orgEmail").value;
    org.password = this.newOrgForm.get("password").value;
    org.phone = this.newOrgForm.get("orgRegion").value;
    org.regionCode = this.newOrgForm.get("orgRegion").value;
    org.hobbyID = this.newOrgForm.get("orgHobby").value;
    org.maxVolunteers = this.newOrgForm.get("orgMax").value;
    org.start = this.newOrgForm.get("startDate").value;
    org.end = this.newOrgForm.get("startDate").value;
    return org;
  }
  onFormSubmit() {
    console.log(this.newOrgForm.value);
    if (!this.newOrgForm.valid) {
      return;
    }
    this.orgnizationService.createOrganization(this.buildOrgReq()).subscribe(suc => {
      if (suc) {
        this.router.navigate(['/']);
      }
    });
  }
}
