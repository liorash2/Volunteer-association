import { Region } from './../models/Region';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hobby } from '../models/Hobby';
import { OrgnizationService } from '../services/orgnization.service';

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.css']
})
export class RegisterOrganizationComponent implements OnInit {
  newOrgForm: FormGroup;
  hobbies: Hobby[];
  regions: Region[];
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private orgnizationService: OrgnizationService) { }

  ngOnInit(): void {
    this.newOrgForm = this.formBuilder.group({
      orgEmail: ['', [Validators.required, Validators.email]],
      orgName: ['', [Validators.required]],
      orgLastName: ['', [Validators.required]],
      orgPhone: ['', [Validators.required]],
      orgMax: [1, [Validators.required]],
      orgHobby: ['', [Validators.required]],
      orgRegion: ['', [Validators.required]],
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
  onFormSubmit() {
    console.log(this.newOrgForm.value);
    if (!this.newOrgForm.valid) {
      return;
    }
  }
}
