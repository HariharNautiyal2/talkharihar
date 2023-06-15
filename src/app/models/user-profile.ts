import { Timestamp } from '@angular/fire/firestore';
export interface ProfileUser {
      ban?:boolean;
  reload?:boolean;
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
    lastMessage?: string;
  lastMessageDate?: Date & Timestamp;
  fcm?:string;
  group?:boolean;
}
