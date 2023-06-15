import { Component, OnInit,ElementRef, ViewChild ,AfterViewInit } from '@angular/core';
import {NavService} from '../../services/nav.service';
import {TypingService} from '../../services/typing.service';
  import { DeviceDetectorService } from 'ngx-device-detector';
import {Router} from '@angular/router';
@Component({
  selector: 'app-coding',
  templateUrl: './coding.component.html',
  styleUrls: ['./coding.component.scss']
})
export class CodingComponent implements OnInit,AfterViewInit {

deviceInfo:any;
  constructor(
    private nav:NavService,
     private ty:TypingService,
      private deviceService: DeviceDetectorService,
     private link:Router
    ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
console.log(this.deviceInfo);
    }

  ngOnInit(): void {
      this.nav.turnOFF();

  }
  ngAfterViewInit(){
      const gh=`
<div class="icon-logo"><div class="logo"></div></div>
<br>
<br>
Welcome to the world of <span class="green">harihar nautiyal</span><br>
          I am checking your browser...<br>
          Hm it seems it is <span class="red">`+this.deviceInfo.browser+`
          </span>
          <br>
          Requesting data...
          <br>
          Verifing device~~ Device type:<br> <span class="green"> 
`+this.deviceInfo.device+`
</span>
<br>
<br>
<br>
Ok, verifing human...
<br>
<span class="green">Finishing...</span>
<br>
<br>
<br>
<span class="red">NOTE:
app is under construction
</span>
<br>
<span class="red">App is in the beta version
so i have left some features under devlopment.
</span>
<br>
<br>
<button class="btn">Redirecting</button>
<br>
<br>

`;
this.type(gh,'blue');
setTimeout(()=>{
    this.link.navigate(['sign-up']);
},gh.length * 17);
           }
rtologin(){
      this.link.navigate(['login']);
}
    type(t:string,color:string){

        this.ty.typing(t,0,$('.text'));

     
        
    }

}
