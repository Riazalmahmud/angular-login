import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { PasswordStrengthValidator } from '../../Shared/custom/custom-password-validation';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  show = false;
  checkConfirmPasswordShow = false;
  checkPassword= 'password';
  checkConfirmPassword= 'password';
  createFormGroup!: FormGroup;
  constructor(private fb : FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) {
  
}
  ngOnInit(): void {
   this.createForm()
  }

  createForm() {
    this.createFormGroup = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',  {
        validators: [Validators.required, Validators.pattern(PasswordStrengthValidator)],
      },),
      confirmPassword: new FormControl('',  {
        validators: [Validators.required, Validators.pattern(PasswordStrengthValidator),],
      }) 
    }, 
      {
  validators: this.matchPassword
}
    );
  }

  matchPassword(formGroup: AbstractControl) {
    const password = formGroup.get('password')?.value;
    const  confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  get email() {
    return this.createFormGroup.get('email')!;
  }
  get password() {
    return this.createFormGroup.get('password')!;
  }
  get confirmPassword() {
    return this.createFormGroup.get('confirmPassword')!;
  }
  get userName() {
    return this.createFormGroup.get('confirmPassword')!;
  }

  onClick(type: number) {
    if (type===1) {
      if (this.checkPassword === 'password') {
        this.checkPassword = 'text';
        this.show = true;
      } else {
        this.checkPassword = 'password';
        this.show = false;
      }
    } else if (type===2) {
      if (this.checkConfirmPassword === 'password') {
        this.checkConfirmPassword = 'text';
        this.checkConfirmPasswordShow = true;
      } else {
        this.checkConfirmPassword = 'password';
        this.checkConfirmPasswordShow = false;
      }
    }
   
  }
  loginSubmit() {
   
 
    if (this.createFormGroup.invalid) {
      for (const control of Object.keys(this.createFormGroup.controls)) {
        this.createFormGroup.controls[control].markAsTouched();
      }
      return;
    }
    this.authService.signUp(this.createFormGroup.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Successful', res.message);
        this.createFormGroup.reset()
        this.router.navigate(['/login'])
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error', err.error.message);
      }
    })
    console.log(this.createFormGroup.value);
  }
}
