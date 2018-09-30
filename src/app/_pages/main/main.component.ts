import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public visible:boolean = true ;

  //Secret stuff
  private keys = "";
  private secret = "just_groove_me";//just_groove_me
  private isUnlocked = false;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.keys += (event.key);
    if (!this.isUnlocked && this.checkSecret()) {
      this.isUnlocked = true;
    }
    console.log(event.key, this.keys, this.isUnlocked);
  }

  onSketchDelete(event) {
    this.isUnlocked = false;
    this.keys = "";
  }

  private checkSecret() {
    if (this.keys.length >= this.secret.length && this.keys.endsWith(this.secret)) {
      return true;
    }
    return false;
  }

  hide(){
    this.visible=false;
    window.location.href = "https://www.google.rs/blahblahblah";
  }

  constructor() {
  }

  ngOnInit() {
  }

}
