import { Injectable } from '@angular/core';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RedirectToHomeGuard implements CanActivate {
  canActivate(): Observable<boolean> {
    return canActivate(() => redirectLoggedInTo(['home']));
  }
}


