import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {
public navbar:boolean = false;
  constructor() { }
  turnON(){
  this.navbar=true;
  }
  turnOFF(){
  this.navbar=false;
  }
}
