import { Component, OnInit } from '@angular/core';
import{Meta} from '@angular/platform-browser';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap ,Observable} from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import { SaveService } from 'src/app/services/save.service';
export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true,
      };
    }

    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    public authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private usersService: UsersService,
    private ss:SaveService,
      private meta:Meta
  ) {

  }

  ngOnInit(){
        this.meta.updateTag({ name: 'theme-color', content: '#90ee90' });
  this.meta.updateTag({ name: 'Description', content: 'Sign Up to talk with harihar nautiyal. A superfast application can also work in 2G speed. Served by harihar creations.' });
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  submit() {
    if (!this.signUpForm.valid) return;

    const { name, email, password } = this.signUpForm.value;
    this.authService
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid, email, displayName:name })
        ),
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing in',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(res => {
        let confirmdata=localStorage.getItem('uid') || "";
        if(confirmdata){
            if(confirmdata != null || "" || undefined){
                 this.router.navigate(['/home']);
            }else{
                if(res != null){
                    this.ss.id=res.uid;
                        this.ss.setsub();
                    localStorage.setItem('uid',res.uid);
                }else{
                    alert('error');
                }
            }
        }
       
      });
  }
        check_sd(uid:any,email:any,displayName:any,photoURL:any) : Observable<any> {
        if(uid != null && email != null && displayName != null  && photoURL != null){
            return this.usersService.addGoogleUser({uid,email,displayName,photoURL})
        }else{
            return uid;
        }
    }
    google(){
          this.authService
      .google().pipe(
        switchMap(({ user: { uid,email,displayName,photoURL } }) =>
          this.check_sd(uid,email,displayName,photoURL)
        ),
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Google Auth',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(res => {
                this.usersService.currentUserProfile$.subscribe(res=>{
                
if(res != null){
                        this.ss.id=res.uid;
                        this.ss.setsub();
   localStorage.setItem('uid',res.uid);
    
    this.router.navigate(['home']);
   }      
                        
                    
                },err=>{alert(err)});
       
      });  
    }
    getErrorMessage() {
    if (this.signUpForm.value.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.signUpForm.value.email.hasError('email') ? 'Not a valid email' : '';
  }
}
