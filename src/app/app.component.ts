import { Component,OnInit} from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { NavService } from './services/nav.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import {ChildrenOutletContexts} from '@angular/router';
import { trigger, transition, query, style, animate, group,animateChild ,state} from '@angular/animations';
import{Meta} from '@angular/platform-browser';
const USERCIRCLE =
  `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.1" fill-rule="evenodd" clip-rule="evenodd" d="M18.1554 18.5659L18.087 18.4067C17.6996 17.3756 17.0535 16.6988 16.0488 16.2901C15.0618 15.8886 13.7385 15.75 12.0001 15.75C10.275 15.75 8.95912 15.8972 7.97442 16.3031C6.97373 16.7156 6.32558 17.3909 5.93304 18.4043L5.85652 18.5771C4.09876 16.9345 3 14.5956 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 14.5897 19.9062 16.9239 18.1554 18.5659ZM8.75 10C8.75 8.20507 10.2051 6.75 12 6.75C13.7949 6.75 15.25 8.20507 15.25 10C15.25 11.7949 13.7949 13.25 12 13.25C10.2051 13.25 8.75 11.7949 8.75 10Z" fill="#07baff"/>
<path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#07baff" stroke-width="2"/>
<path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke="#07baff" stroke-width="2"/>
<path d="M6.16406 18.5C6.90074 16.5912 8.56373 16 12.0001 16C15.4661 16 17.128 16.5578 17.855 18.5" stroke="#07baff" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

const MAILCIRCLE= `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8H8C7.45 8 7.005 8.45 7.005 9L7 15C7 15.55 7.45 16 8 16H16C16.55 16 17 15.55 17 15V9C17 8.45 16.55 8 16 8ZM8.00001 9.99997L12 12.5L16 9.99997V15H8.00001V9.99997ZM8.00001 9.00001L12 11.5L16 9.00001H8.00001Z" fill="#07baff"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="#07baff"/>
</svg>
`;
const LOCKCIRCLE =`
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 14C12.5 14.2761 12.2761 14.5 12 14.5C11.7239 14.5 11.5 14.2761 11.5 14C11.5 13.7239 11.7239 13.5 12 13.5C12.2761 13.5 12.5 13.7239 12.5 14Z" fill="#07baff"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 9.5V11H9C8.46582 11 8 11.3882 8 11.9167V16.0833C8 16.6118 8.46582 17 9 17H15C15.5342 17 16 16.6118 16 16.0833V11.9167C16 11.3882 15.5342 11 15 11H14.5V9.5C14.5 8.11929 13.3807 7 12 7C10.6193 7 9.5 8.11929 9.5 9.5ZM13.5 9.5V11H10.5V9.5C10.5 8.67157 11.1716 8 12 8C12.8284 8 13.5 8.67157 13.5 9.5ZM9 16V12H15V16H9Z" fill="#07baff"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="#07baff"/>
</svg>
`;
const TICKCIRCLE =`
<svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.5 10L11 14.5" stroke="#07baff" stroke-width="2" stroke-linecap="round"/>
<path d="M9 12.5L11 14.5" stroke="#07baff" stroke-width="2" stroke-linecap="round"/>
<rect x="3" y="3" width="18" height="18" rx="9" stroke="#07baff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const GOOGLE =`
<svg xmlns="http://www.w3.org/2000/svg" width="705.6" height="720" viewBox="0 0 186.69 190.5" xmlns:v="https://vecta.io/nano">
  <g transform="translate(1184.583 765.171)">
    <path clip-path="none" mask="none" d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z" fill="#4285f4" />
    <path clip-path="none" mask="none" d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853" />
    <path clip-path="none" mask="none" d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05" />
    <path d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z" fill="#ea4335" clip-path="none" mask="none" />
  </g>
</svg>
`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
animations: [
    trigger('routeAnimations', [
      transition('loginPage <=> signPage', [

          
          group([
        query(':leave', [
         style({ position: 'fixed', transform: 'translateX(0)', opacity: 1,width:'100%',height:'100%'}),
  animate('0.8s ease', style({ transform: 'translateX(-100%)', opacity: 0,width:'100%',height:'100%'})),
        ]),
        query(':enter', [
           style({ position: 'fixed', transform: 'translateX(100%)', opacity: 0,width:'100%',height:'100%' }),
  animate('0.8s ease', style({ transform: 'translateX(0)', opacity: 1,width:'100%',height:'100%'})),
        ]),
      ]),
 
      ]),

              transition('homePage <=> landingPage', [

          
          group([
        query(':leave', [
         style({ position: 'fixed', transform: 'translateX(0)', opacity: 1,width:'100%',height:'100%'}),
  animate('0.8s ease', style({ transform: 'translateY(-100%)', opacity: 0,width:'100%',height:'100%'})),
        ]),
        query(':enter', [
           style({ position: 'fixed', transform: 'translateY(100%)', opacity: 0 ,width:'100%',height:'100%'}),
  animate('0.8s ease', style({ transform: 'translateY(0)', opacity: 1,width:'100%',height:'100%'})),
        ]),
      ]),
 
      ]),
                      transition('loginPage <=> homePage', [

          
          group([
        query(':leave', [
         style({ position: 'fixed', transform: 'translateX(0)', opacity: 1,width:'100%',height:'100%'}),
  animate('0.8s ease', style({ transform: 'translateY(-100%)', opacity: 0,width:'100%',height:'100%'})),
        ]),
        query(':enter', [
           style({ position: 'fixed', transform: 'translateY(100%)', opacity: 0 ,width:'100%',height:'100%'}),
  animate('0.8s ease', style({ transform: 'translateY(0)', opacity: 1,width:'100%',height:'100%'})),
        ]),
      ]),
 
      ]),
                      transition('signPage <=> homePage', [

          
          group([
        query(':leave', [
         style({ position: 'fixed', transform: 'translateX(0)', opacity: 1,width:'100%',height:'100%'}),
  animate('0.8s ease', style({ transform: 'translateY(-100%)', opacity: 0,width:'100%',height:'100%'})),
        ]),
        query(':enter', [
           style({ position: 'fixed', transform: 'translateY(100%)', opacity: 0 ,width:'100%',height:'100%'}),
  animate('0.8s ease', style({ transform: 'translateY(0)', opacity: 1,width:'100%',height:'100%'})),
        ]),
      ]),
 
      ]),

    transition('homePage <=> profilePage', [

          
          group([
        query(':leave', [
         style({ position: 'fixed', transform: 'translateX(0)', opacity: 1,width:'100%',height:'100%'}),
  animate('0.8s ease', style({ transform: 'translateX(100%)', opacity: 0,width:'100%',height:'100%'})),
        ]),
        query(':enter', [
           style({ position: 'fixed', transform: 'translateX(100%)', opacity: 0,width:'100%',height:'100%' }),
  animate('0.8s ease', style({ transform: 'translateX(0)', opacity: 1,width:'100%',height:'100%'})),
        ]),
      ]),
 
      ]),

    ]),
  
    trigger("myTrigger", [
      state(
        "fadeInFlash",
        style({
          opacity: "1"
        })
      ),
      transition("void => *", [
        style({ opacity: "0", transform: "translateY(20px)" }),
        animate("500ms")
      ])
    ])

  ]
})
export class AppComponent implements OnInit{
    currentRoute: string = '';
    
      prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
    
ngOnInit(){
  this.meta.updateTag(
  {name:'theme-color',content:'#07baff'},
  );
                           

          


    
    let conf=localStorage.getItem('in') || "";
    if(conf == "true"){
               

        
               $('#eESQu2k8rm61').css("animation","2s ease dashs forwards")
                setTimeout(()=>{
                    $('.svg-ani > line').css("animaton","2s fadghcbe ease forwards");
                    setTimeout(()=>{
                        $(".loader").css("display","none");
                    },500);
                },500);

    }else{
                      $('#eESQu2k8rm61').css("animation","2s ease dashs forwards")
                setTimeout(()=>{
                    $('.svg-ani > line').css("animaton","2s fadghcbe ease forwards");
                    setTimeout(()=>{
                        $(".loader").css("display","none");
                    },500);
                },500);
        
     localStorage.clear();


        
    }

}
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public nav:NavService,
     iconRegistry: MatIconRegistry,
     sanitizer: DomSanitizer,
     private contexts: ChildrenOutletContexts,
     private meta:Meta
  ) {

         iconRegistry.addSvgIconLiteral('user-circle', sanitizer.bypassSecurityTrustHtml(USERCIRCLE));
        iconRegistry.addSvgIconLiteral('mail-circle', sanitizer.bypassSecurityTrustHtml(MAILCIRCLE));
        iconRegistry.addSvgIconLiteral('lock-circle', sanitizer.bypassSecurityTrustHtml(LOCKCIRCLE));
        iconRegistry.addSvgIconLiteral('tick-circle', sanitizer.bypassSecurityTrustHtml(TICKCIRCLE));
        iconRegistry.addSvgIconLiteral('google', sanitizer.bypassSecurityTrustHtml(GOOGLE));
  }

  logout() {
  localStorage.clear();
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }
getRouteAnimationData() {
  return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
}

}
