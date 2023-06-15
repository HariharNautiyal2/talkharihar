import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RthGuard implements CanActivate {
    constructor(private link:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
           
    let conf=localStorage.getItem('in') || "";
        if(conf != ""){
            this.link.navigate(['home']);
        }else{
            this.link.navigate(['landing']);
        }
        return true;
  }
  
}
