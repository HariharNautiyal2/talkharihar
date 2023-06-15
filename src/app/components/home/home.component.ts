import { Component, ElementRef, OnInit,AfterViewInit ,ViewChild, Output, EventEmitter,AfterContentInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {NavService} from '../../services/nav.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import{Meta} from '@angular/platform-browser';
import {
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap,
  concatMap,
  take,
    Subject
} from 'rxjs';
import { collection,Firestore,collectionData ,query,orderBy,Timestamp} from "@angular/fire/firestore";
import { Message } from 'src/app/models/chat';
import { ProfileUser } from 'src/app/models/user-profile';
import { ChatsService } from 'src/app/services/chats.service';
import { UsersService } from 'src/app/services/users.service';
import { SaveService } from 'src/app/services/save.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit,AfterViewInit,AfterContentInit {
  @ViewChild('endOfChat')
  endOfChat!: ElementRef;
  flag: boolean = true;
  state: string = "fadeInFlash";

input:string;
  searchControl = new FormControl('');
  messageControl = new FormControl('');
  chatListControl = new FormControl('');

_messages:Message[] = [];
id:string;


  constructor(
    public us:UsersService,
    private chatsService: ChatsService,
    private firestore: Firestore,
    private nav:NavService,
    public s:SaveService,
    private imageUploadService:ImageUploadService,
    private toast:HotToastService,
    private bs:MatBottomSheet,
         private meta:Meta
  ) {
        if (this.flag) {
      // Enabling Animation
      this.flag = !this.flag;
    }
  }



  ngOnInit(): void {
       this.meta.updateTag({ name: 'theme-color', content: '#07baff' });

let uid=localStorage.getItem('uid') || "";
      if(uid != null){
this.id=uid;
  }
                        




  }
  

  
sethtml(data:any,me:string){
       $('.'+JSON.stringify(data.seconds)).html(me);
}
stringify(sany:any){
    return JSON.stringify(sany);
}
setViewed(message:Message){

    if(message.viewed != undefined){
   const confirm =message.viewed.find((a:any)=>{
       return a.senderId === this.id
   });
        if(confirm){
            
        }else{
               let l = message.viewed.push({
        senderPhoto:this.us.user.photoURL ?? 'assets/images/smile.svg',
        senderId:this.id
    });
            if(l){
                this.chatsService.updateMessage(message);
            }
        }


           
    
    }else{
   let l = message.viewed=[{
        senderPhoto:this.us.user.photoURL ?? 'assets/images/smile.svg',
        senderId:this.id
    }];
        if(l){
                this.chatsService.updateMessage(message);
        }
    }
 return '';
}

setDate(m:Message[]){

    localStorage.setItem('messages',JSON.stringify(m));
    let index=m.length - 1;
    let date=m[index].sentDate.seconds;
    localStorage.setItem('lst-msg-date',JSON.stringify(date));
    
    this.scrollToBottom()
}
  sendMessage() {
    if (this.flag) {
      // Enabling Animation
      this.flag = !this.flag;
    }
    if (this.input != undefined) {
         const today = Timestamp.fromDate(new Date());
        if(this.s.group === true){
           
               let m= {
          text: this.input,
          senderId: this.id,
          sentDate: today,
          senderPhoto:this.us.user.photoURL,
          senderName:this.us.user.displayName
        };
                  this.chatsService
        .addChatMessage(this.id,m)
        .subscribe(() => {
     
        
        });
        }else{
               let m= {
          text: this.input,
          senderId: this.id,
          sentDate: today,
        };
                  this.chatsService
        .addChatMessage(this.id,m)
        .subscribe(() => {
     
        
        });
        }


      
    }else{
   
    }
      this.input='';
      $('textarea').focus();
  }
  sendImage(event: any, user: ProfileUser) {
      let now =new Date();
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/messages/${user.uid}/${JSON.stringify(now)}`)
      .pipe(
        this.toast.observe({
          loading: 'Compressing Image',
          success: 'Image uploaded!',
          error: 'There was an error in uploading',
        }),
        concatMap((photoURL) =>
          this.chatsService.addChatPhoto(this.id,photoURL)
        )
      )
      .subscribe();
  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.endOfChat) {
        this.endOfChat.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
camera(){
    this.bs.open(Camera,{
      panelClass: 'bottom-sheet'
    });
}
    input_click(){
        $('.upload').click();
    }
  ngAfterViewInit() {}
  ngAfterContentInit() {}
}
@Component({
  selector: 'bs-camera',
  templateUrl: './camera.html'
})
export class Camera  {
     sendImage(data:any) {
      let now =new Date();
    this.imageUploadService
      .cuploadImage(data, `images/messages/${this.usersService.user.uid}/${JSON.stringify(now)}`)
      .pipe(
        this.toast.observe({
          loading: 'Compressing Image',
          success: 'Image uploaded!',
          error: 'There was an error in uploading',
        }),
        concatMap((photoURL) =>
          this.chatsService.addChatPhoto(this.usersService.user.uid,photoURL)
        )
      )
      .subscribe();
  }
    
    height:any=$('.mat-bottom-sheet-container').height();
    width:any=$('.mat-bottom-sheet-container').width();
    
      @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
img:number=0;
  // webcam snapshot trigger
  private trigger: Subject<any> = new Subject<any>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
   nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
  constructor(
    public usersService: UsersService,
    private chatsService: ChatsService,
    private firestore: Firestore,
    private nav:NavService,
    public s:SaveService,
    private imageUploadService:ImageUploadService,
    private toast:HotToastService,
    private bs:MatBottomSheet,
     private bsr:MatBottomSheetRef
  ) {
    
  }
   ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

   triggerSnapshot(): void {
    this.trigger.next(void 0);
  }

   toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

   handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

   showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

   handleImage(webcamImage: WebcamImage): void {
       
if(this.img===0){
    this.sendImage(webcamImage);
    this.img=1;
}
         this.bsr.dismiss();                  
  }

   cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

   get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

   get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }
}