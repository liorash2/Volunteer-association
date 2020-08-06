import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { format } from 'path';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUserForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.newUserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      iam: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      confirmPass: ['', [Validators.required, this.passwordValidators.bind(this)]]
    });
  }
  passwordValidators(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && this.newUserForm && this.newUserForm.get('password') && control.value !== this.newUserForm.get('password').value) {
      return { match: true };
    }
    return null;
  }



  onFormSubmit() {
    console.log(this.newUserForm.value);
  }

}
