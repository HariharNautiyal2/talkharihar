import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import { HotToastService } from '@ngneat/hot-toast';
import {switchMap,Observable} from 'rxjs';
import {SaveService} from 'src/app/services/save.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService,
    private us:UsersService,
     private ss:SaveService
  ) {
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: 'There was an error',
        })
      )
      .subscribe(res => {
                this.us.currentUserProfile$.subscribe(res=>{
                
if(res != null){
    this.ss.id=res.uid;
    this.ss.setsub();
   localStorage.setItem('uid',res.uid);
    this.router.navigate(['home']);
   }      
                        
                    
                },err=>{alert(err)});
            
      },err=>{
        alert(err);
    });
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
                this.us.currentUserProfile$.subscribe(res=>{
                
if(res != null){
                        this.ss.id=res.uid;
                        this.ss.setsub();
   localStorage.setItem('uid',res.uid);
    this.router.navigate(['home']);
   }      
                        
                    
                },err=>{alert(err)});
            
      },err=>{
        alert(err);
    });
  
    }
        check_sd(uid:any,email:any,displayName:any,photoURL:any) : Observable<any> {
        if(uid != null && email != null && displayName != null  && photoURL != null){
            return this.us.addGoogleUser({uid,email,displayName,photoURL});
        }else{
            return uid;
        }
    }
}
