import {Platform} from 'ionic-angular';
import {TetraNavbar} from "../../components/tetra-navbar/tetra-navbar";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'build/pages/about/about.html',
  directives: [TetraNavbar]
})
export class AboutPage {
  
  constructor(private platform: Platform) {
  }
}
