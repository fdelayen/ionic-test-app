import {Component, Input} from '@angular/core';
import {IONIC_DIRECTIVES, NavController} from 'ionic-angular';
import {Notification} from "../../pages/notification/notification";

@Component({
  selector: 'tetra-navbar',
  templateUrl: 'build/components/tetra-navbar/tetra-navbar.html',
  directives: [IONIC_DIRECTIVES]
})
export class TetraNavbar {
  @Input() hideNotification:boolean;
  buttonStyle: any;

  constructor(private nav: NavController) {
    this.buttonStyle = {};
  }

  ngOnInit() {
    if(this.hideNotification) {
      this.buttonStyle = {display: "none"};
    }
  }

  openNotifs() {
    this.nav.push(Notification);
  }
}
