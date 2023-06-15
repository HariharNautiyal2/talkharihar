import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import {LandingComponent} from './components/landing/landing.component';
import {CodingComponent} from './components/coding/coding.component';
import { Observable } from 'rxjs';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ProfileComponent } from './components/profile/profile.component';
import {RtlGuard} from './guards/rtl.guard';
import {RthGuard} from './guards/rth.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['landing']);
const redirectLoggedInToHome= () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'landing'
  },
  {
    path: 'login',
    component: LoginComponent,
       data: { animation: 'loginPage' ,authGuardPipe: redirectLoggedInToHome},
      canActivate: [AuthGuard],

     
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
      data: { animation: 'signPage',authGuardPipe: redirectLoggedInToHome },
  canActivate: [AuthGuard],
    
  },
  {
    path: 'home',
    component: HomeComponent,
      data: { animation: 'homePage',authGuardPipe: redirectUnauthorizedToLogin },
canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
      data: { animation: 'profilePage',authGuardPipe: redirectUnauthorizedToLogin },
canActivate: [AuthGuard],
  },
    {
    path: 'landing',
    component: LandingComponent,
        data: { animation: 'landingPage',authGuardPipe: redirectLoggedInToHome },
 canActivate: [AuthGuard],
  },
     {
    path: 'coding',
    component: CodingComponent,
         data: { animation: 'codingPage' ,authGuardPipe: redirectUnauthorizedToLogin},
canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
