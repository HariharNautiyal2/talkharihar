import { Timestamp } from '@angular/fire/firestore';
import { ProfileUser } from './user-profile';



export interface Message {
  text?: string;
  senderId: string;
  sentDate: Date & Timestamp;
  url?:string;
  animate:boolean;
senderPhoto?:string;
senderName?:string;
  viewed?:
  [
  {
  senderPhoto:string;
  senderId: string;
}
]
  ;
}
