import {NavParams, NavController, IONIC_DIRECTIVES} from 'ionic-angular';
import {ClientDetailsRappelDetail} from "../client-detail-rappel-detail/client-detail-rappel-detail";
import {NotificationLocal} from "../../plugin/NotificationLocal";
import {NgZone, Component} from "@angular/core";
import * as moment from 'moment';
import {AppStorage} from "../../providers/appStorage/appStorage";
require('moment/locale/fr');
moment.locale("fr");

@Component({
  templateUrl: 'build/pages/notification/notification.html',
  directives: [IONIC_DIRECTIVES]
})
export class Notification {
  client: any;
  rappels: any[];
  moment: any;

  constructor(private navParams: NavParams, private nav: NavController, private zone:NgZone) {
    this.moment = moment;
    this.rappels = [];

    this.load();
  }

  /* Mise à jour à chaque affichage */
  ionViewDidEnter() {
    this.load();
  }

  load() {
    var notificationLocal = NotificationLocal.get();

    if(notificationLocal) {
      var self = this;
      notificationLocal.getAll(function (notifs) {
        for(let n of notifs) {
          if(n.data) {
            n.data = JSON.parse(n.data);
            if(n.data.date) {
              n.date = moment(n.data.date).format();
              n.dateFormat = moment(n.data.date).format("LLLL");
            }
          }
        }

        notifs = _.sortBy(notifs, function(n:any) {
          return moment(n.date).valueOf();
        });

        self.zone.run(function() {
          self.rappels = notifs;
        });
      });
    }
  }

  openRappel(rappel) {
    /* Recherche du client */
    var client = AppStorage.get("clients", rappel.data.clientId);
    /* Ouverture */
    this.nav.push(ClientDetailsRappelDetail, {
      client: client[0],
      item: rappel,
      modifier: true
    });
  }
}
