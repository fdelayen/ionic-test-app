import {NavParams, ViewController} from 'ionic-angular';
import {TetraNavbar} from '../../components/tetra-navbar/tetra-navbar';
import {NavController} from '../../../node_modules/ionic-angular/components/nav/nav-controller';
import {Component} from "@angular/core";
import {AppStorage} from "../../providers/appStorage/appStorage";

@Component({
  templateUrl: 'build/pages/client-detail-rapport-choix/client-detail-rapport-choix.html',
  directives: [TetraNavbar]
})
export class ClientDetailsRapportChoix {
  types:any[];
  type:any;

  constructor(private navParams: NavParams, private nav: NavController, private viewCtrl: ViewController) {
    this.types = _.filter(AppStorage.get("rapports"), function(s:any) {
      return s.type == "Rapport";
    });
  }

  Creer() {
    this.viewCtrl.dismiss(this.type);
  }

  Annuler() {
    this.viewCtrl.dismiss(false);
  }
}
