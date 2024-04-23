import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from '../../Shared/custom/custom-password-validation';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  show = false;
  checkPassword= 'password';
  createFormGroup!: FormGroup;
  constructor(private fb : FormBuilder, private authService: AuthService, private toster: ToastrService, private router: Router) {
  
}
  ngOnInit(): void {
   this.createForm()
  }

  createForm() {
    this.createFormGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',  {
        validators: [Validators.required, Validators.pattern(PasswordStrengthValidator)],
      },)
    });
  }
  get email() {
    return this.createFormGroup.get('email')!;
  }
  get password() {
    return this.createFormGroup.get('password')!;
  }

  onClick() { 
    if (this.checkPassword === 'password') {
      this.checkPassword = 'text';
      this.show = true;
    } else {
      this.checkPassword = 'password';
      this.show = false;
    }
  }
  loginSubmit() {
    if (this.createFormGroup.invalid) {
      for (const control of Object.keys(this.createFormGroup.controls)) {
        this.createFormGroup.controls[control].markAsTouched();
      }
      return;
    }
    this.authService.signIn(this.createFormGroup.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.toster.success('Successful', res.message);
        this.router.navigate(['/'])
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.toster.error('Error', err.error.message);
      }
  })
    console.log(this.createFormGroup.value);
  }
}
