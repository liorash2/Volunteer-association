import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  errorMsg: string;
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    });
  }


  OnSubmit() {
    console.log(this.userForm);
    if (!this.userForm.valid) {
      return;
    }
    this.userService.login(this.userForm.value.email, this.userForm.value.password).subscribe(success => {
      if (!success) {
        this.errorMsg = 'Invalid credentials. Please check your user name and password.';
        setTimeout(() => {
          this.errorMsg = null;
        }, 2000);
      } else {
        this.router.navigate(['/']);
      }
    });

  }

}
