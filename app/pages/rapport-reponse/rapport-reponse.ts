import {NavParams, NavController} from 'ionic-angular';
import {AppStorage} from "../../providers/appStorage/appStorage";
import * as _ from 'lodash';
import {TetraNavbar} from "../../components/tetra-navbar/tetra-navbar";
import {TetraRapportItemEvents} from "../../components/tetra-rapport-item-events/tetra-rapport-item-events"
import * as uuid from 'node-uuid';
import * as moment from 'moment';
import {Component} from "@angular/core";
require('moment/locale/fr');
moment.locale("fr");

@Component({
  templateUrl: 'build/pages/rapport-reponse/rapport-reponse.html',
  directives: [TetraNavbar, TetraRapportItemEvents]
})
export class RapportReponse {
  rapport:any;
  client:any;
  reponses:any;
  date: any;
  position: any = false;

  constructor(private navParams: NavParams, private nav: NavController) {
    this.rapport = navParams.get('rapport');
    this.client = navParams.get('client');
    this.reponses = {fige: false};
    var reponses:any;

    if(this.client) {
      reponses = [];
      if(navParams.get('visite')) {
        reponses.push(navParams.get('visite'));
      }
    } else {
      reponses = AppStorage.get("rapport_reponse", this.rapport.id, "rapport_id");
      if(reponses.length == 0) {
        this.reponses.id = uuid.v4();
        this.reponses.date = moment().format();
      }
    }

    /* Géolocalisation */
    navigator.geolocation.getCurrentPosition((pos) => {
      this.position = pos;
    }, () => {
      /* Erreur */
    }, {timeout: 10000, enableHighAccuracy: true});
  }

  remove() {
    this.nav.pop();
  }

  valider() {
    this.nav.pop();
  }
}
