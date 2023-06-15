import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypingService {

  constructor() { }
      typing(text:string, n:number, r:JQuery<HTMLElement>){
 if(text.length != n){
 		r.html(text.substring(0, n+ 1))
		setTimeout(() => {
			this.typing( text, n +1,r);
		}, 10);
            
 }else{

 }

}

}
