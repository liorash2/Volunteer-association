import { VolunteerService } from './../services/volunteer.service';
import { Volunteer } from './../models/volunteer';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Hobby } from '../models/Hobby';
import { Region } from '../models/Region';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-volunteer',
  templateUrl: './register-volunteer.component.html',
  styleUrls: ['./register-volunteer.component.css']
})
export class RegisterVolunteerComponent implements OnInit {

  newVolForm: FormGroup;
  hobbies: Hobby[];
  regions: Region[];
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private volunteerService: VolunteerService, private router: Router) { }

  ngOnInit(): void {
    this.newVolForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDay: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      hobbies: this.formBuilder.array([], [Validators.required]),
      regions: this.formBuilder.array([], [Validators.required]),
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
  onCheckboxChange(e, name) {
    const checkArray: FormArray = this.newVolForm.get(name) as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  buildVolReq(): Volunteer {
    const vol = new Volunteer();
    vol.firstName = this.newVolForm.get("firstName").value;
    vol.lastName = this.newVolForm.get("lastName").value;
    vol.birthDay = this.newVolForm.get("birthDay").value;
    vol.password = this.newVolForm.get("password").value;
    vol.email = this.newVolForm.get("email").value;
    vol.phone = this.newVolForm.get("phone").value;
    vol.start = this.newVolForm.get("startDate").value;
    vol.end = this.newVolForm.get("endDate").value;
    vol.hobbies = this.newVolForm.get("hobbies").value.map(r => +r);
    vol.regions = this.newVolForm.get("regions").value;
    return vol;
  }
  onFormSubmit() {
    console.log(this.newVolForm.value);
    if (!this.newVolForm.valid) {
      return;
    }
    this.volunteerService.createVolunteers(this.buildVolReq()).subscribe(suc => {
      if (suc) {
        this.router.navigate(['/']);
      }
    });
  }
}
