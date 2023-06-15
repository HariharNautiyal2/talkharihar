import { Component, OnInit } from '@angular/core';
import {NavService} from '../../services/nav.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap ,Observable} from 'rxjs';
import {SaveService} from 'src/app/services/save.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(
   private authService:AuthenticationService,
   private usersService:UsersService,
   private toast:HotToastService,
   private router:Router,
   private ss:SaveService
  ) {}

  ngOnInit(): void {

  }
  sd(){}
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
}
