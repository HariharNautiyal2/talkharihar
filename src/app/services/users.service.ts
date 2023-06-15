import { Injectable ,OnInit,Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  updateDoc,
    getDoc
} from '@angular/fire/firestore';
import { from, Observable, of, switchMap,concatMap } from 'rxjs';
import { ProfileUser } from '../models/user-profile';
import { AuthenticationService } from './authentication.service';
import {SaveService} from './save.service';
@Injectable({
  providedIn: 'root',
})
export class UsersService implements OnInit {
    ngOnInit(){
      
        
    }
    id:string=JSON.stringify(localStorage.getItem('uid') || "none");
    public user:ProfileUser={
        photoURL:'assets/images/smile.svg',
        uid:this.id,
        
    };

  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
            let data= docData(ref) as Observable<ProfileUser>;
            data.subscribe(res=>{
            if(res.lastMessageDate != undefined){
                        localStorage.setItem('lst-msg-update',JSON.stringify(res.lastMessageDate.seconds || 1440145260));
            this.ss.lst=res.lastMessageDate.seconds;
            }

            if(res != null){
            this.user=res;
            if(res.ban == true){
            this.ban();
            }
            if(res.group){
            if(this.ss.group === false){
                        this.ss.group=true;
            this.ss.setsub();
            localStorage.setItem('permit_group','true');
            }

            
            }else{
                       if(this.ss.group === true){
                        this.ss.group=false;
            this.ss.setsub();
            localStorage.setItem('permit_group','false');
            }
            }
                        if(res.ban == false){
            this.dia.closeAll();
            }
            if(res.reload == true){
            let c_user=res;
            c_user.reload=false;
            this.updateUser(c_user).subscribe(()=>{
            window.location.reload();
            });
            }
            }
            });
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }


  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService,
            private dia:MatDialog,
            private ss:SaveService
  ) {
            
            this.currentUserProfile$.subscribe();
            
        }

  addUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    const set = localStorage.setItem('uid', user?.uid);

    return from(setDoc(ref, user));

        

    

  }
        addGoogleUser(user: ProfileUser): Observable<any> {
            const usersRef = doc(this.firestore, 'users', user?.uid);
       return  from(getDoc(usersRef)
  .then(docSnapshot => {
            if(docSnapshot.exists()){
       
        }
else{
     const set = localStorage.setItem('uid', user?.uid);
     setDoc(usersRef, user);                             
}
})
);

        

    

  }

  updateUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }
    group(){
    this.dia.open(Group,{

   
     
    });
  }
              ban(){
    this.dia.open(NotifyComponent,{
      panelClass: 'my-css-class',
        disableClose: true,
        backdropClass: 'backdropBackground'
    });
  }
}
                @Component({
  selector: 'app-group',
  templateUrl: './group.html'
})
export class Group {}
@Component({
  selector: 'app-banned',
  templateUrl: './ban.html'
})
export class NotifyComponent {}