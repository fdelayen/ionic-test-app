import {NavParams, NavController, Platform} from 'ionic-angular';
import {TetraNavbar} from "../../components/tetra-navbar/tetra-navbar";
import {AppStorage} from "../../providers/appStorage/appStorage";
import {ClientDetailsRappelDetail} from "../client-detail-rappel-detail/client-detail-rappel-detail";
import {NgZone, Component} from "@angular/core";
import * as moment from 'moment';
import {Client} from "../../providers/client/client";
require('moment/locale/fr');
moment.locale("fr");

@Component({
  templateUrl: 'build/pages/client-detail-rappel/client-detail-rappel.html',
  directives: [TetraNavbar]
})
export class ClientDetailsRappel {
  client: any = {};
  rappels: any[];
  moment: any;

  constructor(private navParams: NavParams, public platform: Platform, private nav: NavController, private zone: NgZone,
              private clientProvider: Client) {
    this.moment = moment;
    this.rappels = [];

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
    var notifs = AppStorage.get("rappels[" + this.client.id + "]");
    if(!notifs) {
      notifs = [];
    }
    var self = this;
    for(let n of notifs) {
      if(n.data.date) {
        n.date = moment(n.data.date).format();
        n.dateFormat = moment(n.data.date).format("LLLL");
      }
    }
    notifs = _.chain(notifs).sortBy((n: any) => {
      return moment(n.date).valueOf();
    }).value();

    self.zone.run(function() {
      self.rappels = notifs;
    });
  }

  add() {
    this.nav.push(ClientDetailsRappelDetail, {
      client: this.client,
      item: {},
      modifier: true
    });
  }

  openRappel(rappel) {
    this.nav.push(ClientDetailsRappelDetail, {
      client: this.client,
      item: rappel,
      modifier: true
    });
  }
}
