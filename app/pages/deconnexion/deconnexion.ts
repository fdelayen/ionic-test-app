import {NavController} from 'ionic-angular';
import {TetraNavbar} from "../../components/tetra-navbar/tetra-navbar";
import {Session} from "../../providers/Session/Session";
import {Login} from "../login/login";
import {NgZone, Component} from "@angular/core";

@Component({
  templateUrl: 'build/pages/deconnexion/deconnexion.html',
  directives: [TetraNavbar]
})
export class DeconnexionPage {
  constructor(private nav:NavController, private session:Session, private zone:NgZone) {
    this.session.token = false;
  }

  ngOnInit(): void {
    this.nav.setRoot(Login);
  }
}
