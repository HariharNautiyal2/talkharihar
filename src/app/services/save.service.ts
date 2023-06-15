import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {  Message } from '../models/chat';
import { ProfileUser } from '../models/user-profile';
import { concatMap, from, map, Observable,switchMap,of, take, tap,Subscription  } from 'rxjs';

import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
  orderBy,
  query,
  Timestamp,
  updateDoc,
    
  where,
} from '@angular/fire/firestore';
import {  DocumentData} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
    loading:boolean=true;
images:Image[] = [];
data:any;
    lst:number =1440145260;
    group:boolean = false;
        subscription: Subscription;
id:string;
       messages:Message[] = [];
  constructor(public http: HttpClient,private firestore: Firestore) {
let sd = localStorage.getItem('lst-msg-update') || "";
if (sd !== "" && sd !== "undefined") {
  this.lst = JSON.parse(sd);
}

    let g =localStorage.getItem('permit_group') || "";
      if(g == "permit_group"){
          this.group=true;
      }
      let uid=localStorage.getItem('uid') || "";
      if(uid != null){
this.id=uid;
  }
      console.log(this.id);
       this.setsub(); 



      
  }
    setsub(){
        if(this.id.length > 5){
          if(this.messages.length === 0){
              if(this.group === true){
                          this.subscription= this.fetchgroupMessages$.subscribe(()=>{
         this.loading=false;
     }); 
              }else{
                          this.subscription= this.fetchMessages$.subscribe(()=>{
         this.loading=false;
     }); 
              }

}else{
    this.messages=[];
      this.subscription.unsubscribe();
 if(this.group === true){
                          this.subscription= this.fetchgroupMessages$.subscribe(()=>{
         this.loading=false;
     }); 
              }else{
                          this.subscription= this.fetchMessages$.subscribe(()=>{
         this.loading=false;
     }); 
              }
}  
        }

 
    }
    
unsub(){
    if(this.messages != []){
        this.subscription.unsubscribe();
        this.messages=[];
    }
}
    
public get fetchMessages$(): Observable<Message[]> {
  if (this.id.length >= 5) {

          if (navigator.onLine) {
            const ref = collection(this.firestore, 'users',this.id,'messages');
            const queryAll = query(ref, orderBy('sentDate', 'asc'));
            let data = collectionData(queryAll) as Observable<Message[]>;
            data.subscribe((res: Message[]) => {
            this.mergeMessages(res); 
                localStorage.setItem('messages', JSON.stringify(res));
               
            });
            return data;
          } else {
            return new Observable<Message[]>((observer) => {
              let x = localStorage.getItem('messages') || "";
              if (x !== "") {
                this.messages = JSON.parse(x);
              } else {
                this.messages = [];
              }
              observer.next(this.messages);
              observer.complete();
            });
          }
    
  } else {
    console.log('it happened');
    return new Observable<Message[]>((observer) => {
      observer.next([]);
      observer.complete();
    });
  }
}

private mergeMessages(newMessages: Message[]): void {
  const existingSeconds = this.messages.map(message => message.sentDate.seconds);
  newMessages.forEach(message => {
    if (!existingSeconds.includes(message.sentDate.seconds)) {
      this.messages.push(message);
    }
  });
}


    public get fetchgroupMessages$(): Observable<Message[]> {
  if (this.id != "none" && this.id != undefined) {

    if (navigator.onLine) {
      const ref = collection(this.firestore, 'messages');
      const queryAll = query(ref, orderBy('sentDate', 'asc'));
      let data = collectionData(queryAll) as Observable<Message[]>;
      data.subscribe((res: Message[]) => {
          this.mergeMessages(res);
        localStorage.setItem('messagesgroup', JSON.stringify(res));
      });
      return data;
    } else {
      return new Observable<Message[]>((observer) => {
        let x = localStorage.getItem('messagesgroup') || "";
        if (x != "") {
          this.messages = JSON.parse(x);
        } else {
          this.messages = [];
        }
        observer.next([] as Message[]);
        observer.complete();
      });
    }
  }else{
            return new Observable<Message[]>((observer) => {
        observer.next([] as Message[]);
        observer.complete();
      });
  }
}

     
   public  scrollToBottom(query: string) : void {
        console.log('scrlled');
  setTimeout(() => {
    const element = document.querySelector(query);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}
}
export class Image{
    url:string;
    data:string;
}