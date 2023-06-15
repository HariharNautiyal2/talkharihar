import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})


export class NotifyService {
constructor(private angularFireMessaging:AngularFireMessaging){}
    requestPermission() {
this.angularFireMessaging.requestToken.subscribe(
token => {
alert(token);
},
err => {
alert('Unable to get permission to notify.' + err);
}
);
}

}