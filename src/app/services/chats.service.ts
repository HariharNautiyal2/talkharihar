import { Injectable,OnInit } from '@angular/core';
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
    setDoc,
  where,
} from '@angular/fire/firestore';
import { concatMap, from, map, Observable,switchMap,of, take, tap } from 'rxjs';
import {  Message } from '../models/chat';
import { ProfileUser } from '../models/user-profile';
import { UsersService } from './users.service';
import {SaveService} from './save.service';
@Injectable({
  providedIn: 'root',
})
export class ChatsService implements OnInit {
    
 
    id:string;
  constructor(
    private firestore: Firestore,
    private usersService: UsersService,
     private ss: SaveService
  ) {
let uid=localStorage.getItem('uid') || "";
      if(uid != null){
this.id=uid;
  }
                        

   

  

    }

    

ngOnInit(){

}


  addChatMessage(id:string, message: any): Observable<any> {
      if(this.ss.group == true){
    const ref = doc(this.firestore, 'messages', JSON.stringify(message.sentDate.seconds));
    return from(setDoc(ref, message))
  
      }else{
    const chatRef = doc(this.firestore, 'users', id);
       const ref = doc(this.firestore, 'users', id,'messages', JSON.stringify(message.sentDate.seconds));
    return this.usersService.currentUserProfile$.pipe(
      take(1),
      concatMap((user) =>
        setDoc(ref, message)
      ),
      concatMap(() =>
        updateDoc(chatRef, { lastMessage: message.text, lastMessageDate:message.sentDate })
      )
    );
      }

  

  }
  addChatPhoto(id:string, url: string): Observable<any> {
      const ref = collection(this.firestore, 'users', id, 'messages');
    const chatRef = doc(this.firestore, 'users', id);
    const today = Timestamp.fromDate(new Date());
    return this.usersService.currentUserProfile$.pipe(
      take(1),
      concatMap((user) =>
        addDoc(ref, {
          senderId: id,
          sentDate: today,
              url:url
        })
      ),
      concatMap(() =>
        updateDoc(chatRef, { lastMessage: "Some image", lastMessageDate: today })
      )
    );
  

  }
  getChatMessages$(chatId: any): Observable<Message[]> {
    const ref = collection(this.firestore, 'users', chatId, 'messages');
    const queryAll = query(ref, orderBy('sentDate', 'asc'));
    return collectionData(queryAll) as Observable<Message[]>;
  }
  updateMessage(m: Message) {
      console.log(JSON.stringify(m.sentDate.seconds));
      console.log(m.sentDate.seconds);
    const ref = doc(this.firestore, 'messages', JSON.stringify(m?.sentDate.seconds));
        return updateDoc(ref, { viewed: m.viewed })
      .then(() => {
        console.log('Message updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating message:', error);
      });
  }
}