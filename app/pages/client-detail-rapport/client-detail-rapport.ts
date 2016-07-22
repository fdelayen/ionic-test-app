import {NavParams, Platform, Modal} from 'ionic-angular';
import {TetraNavbar} from '../../components/tetra-navbar/tetra-navbar';
import {NavController} from '../../../node_modules/ionic-angular/components/nav/nav-controller';
import {ClientDetailsRapportChoix} from "../client-detail-rapport-choix/client-detail-rapport-choix";
import {RapportReponse} from "../rapport-reponse/rapport-reponse";
import {AppStorage} from "../../providers/appStorage/appStorage";
import * as moment from 'moment';
import {Client} from "../../providers/client/client";
import {Component} from "@angular/core";
require('moment/locale/fr');
moment.locale("fr");

@Component({
  templateUrl: 'build/pages/client-detail-rapport/client-detail-rapport.html',
  directives: [TetraNavbar]
})
export class ClientDetailsRapport {
  client: any;
  visites: any[];

  constructor(private navParams: NavParams, private nav: NavController, private platform: Platform,
              private clientProvider: Client) {

    clientProvider.getObservable().subscribe((client) => {
      this.client = client;
      this.load();
    });
  }

  /* Mise à jour à chaque affichage */
  ionViewDidEnter() {
    this.load();
  }

  load() {
    this.visites = AppStorage.get("rapport_reponse[" + this.client.id + "]");

    if(!this.visites) {
      this.visites = [];
    }

    for(let v of this.visites) {
      if(v.date) {
        v.dateFormat = moment(v.date).format("LLLL");
      }
    }

    this.visites = _.sortBy(this.visites, function(v:any) {
      return -(moment(v.date).valueOf());
    });
  }

  add() {
    let modal = Modal.create(ClientDetailsRapportChoix);
    modal.onDismiss(data => {
      if(data) {
        var rapport = AppStorage.get("rapports", data);
        if(rapport.length > 0 && data) {
          this.nav.push(RapportReponse, {
            client: this.client,
            rapport: rapport[0]
          });
        }
      }
    });
    this.nav.present(modal);
  }

  openRapport(visite) {
    var rapport = AppStorage.get("rapports", visite.rapport_id);
    if(rapport.length > 0 && visite.rapport_id) {
      this.nav.push(RapportReponse, {
        client: this.client,
        rapport: rapport[0],
        visite: visite
      });
    }
  }
}
