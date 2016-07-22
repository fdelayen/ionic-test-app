import {NavParams, Platform} from 'ionic-angular';
import {NavController} from "../../../node_modules/ionic-angular/components/nav/nav-controller";
import {AppStorage} from "../../providers/appStorage/appStorage";
import {DatePicker} from "ionic-native";
import * as moment from 'moment';
import {NgZone, Component} from "@angular/core";
require('moment/locale/fr');
moment.locale("fr");

@Component({
  templateUrl: 'build/pages/client-detail-rappel-detail/client-detail-rappel-detail.html'
})
export class ClientDetailsRappelDetail {
  item: any;
  client: any;
  moment: any;
  modifier: boolean;

  constructor(private navParams: NavParams, private nav: NavController, private zone:NgZone, public platform: Platform) {
    this.item = navParams.get('item');
    this.client = navParams.get('client');
    this.modifier = navParams.get('modifier');
    this.moment = moment;

    if(!this.item.id) {
      this.item.date = moment(new Date()).minute(0).add(1,'h');
    } else {
      this.item.titre = this.item.title;
      this.item.description = this.item.text;
    }
    
    if(!this.modifier) {
      if(this.item.data) {
        this.item.data = JSON.parse(this.item.data);
        if(this.item.data.date) {
          this.item.date = moment(this.item.data.date).format();
          this.item.dateFormat = moment(this.item.data.date).format("LLLL");
        }
      }
    }
  }

  selectDate(key:string) {
    DatePicker.show(<any>{androidTheme: 5, date: moment(this.item[key]).toDate()}).then(
      d => this.item[key] = moment(d)
        .minute(moment(this.item[key]).minute())
        .hour(moment(this.item[key]).hour())
    ).catch(function(err) {
    });
  }

  selectTime(key:string) {
    DatePicker.show(<any>{mode:'time', androidTheme: 5, minuteInterval: 5, is24Hour: true, date: moment(this.item[key]).toDate()}).then(
      d => this.item[key] = moment(this.item[key])
        .minute(moment(d).minute())
        .hour(moment(d).hour())
    ).catch(function(err) {
    });
  }

  save() {
    if(!this.item.id) {
      let obj = {
        id: Math.floor((Math.random() * 1000000) + 1),
        title: this.item.titre,
        text: this.item.description,
        at: moment(this.item.date).toDate(),
        data: { client: this.client.nom, clientId: this.client.id, date: moment(this.item.date).format(), date_modification: moment().format() }
      };
      this.addNotificationToStorage(obj);

    } else {
      let obj = {
        id: this.item.id,
        title: this.item.titre,
        text: this.item.description,
        at: moment(this.item.date).toDate(),
        data: { client: this.client.nom, clientId: this.client.id, date: moment(this.item.date).format(), date_modification: moment().format() }
      };
      this.addNotificationToStorage(obj, true);
    }

    this.nav.pop();
  }

  remove() {
    var self = this;
    this.removeNotificationToStorage(self);

    self.nav.pop();
  }

  selectDateRappel() {
    this.selectDate("date");
  }

  selectHeureRappel() {
    this.selectTime("date")
  }

  addNotificationToStorage(rappel, update = false) {
    var rappels = AppStorage.get("rappels[" + this.client.id + "]");
    if (!rappels) {
      rappels = [];
    }
    if (update) {
      rappels = _.filter(rappels, function(r: any) { return r.id != rappel.id; });
    }
    rappels.push(rappel);
    AppStorage.set("rappels[" + this.client.id + "]", rappels);
  }

  removeNotificationToStorage(self) {
    var rappels = AppStorage.get("rappels[" + self.client.id + "]");
    if (!rappels) {
      rappels = [];
    }
    rappels = _.filter(rappels, function(r: any) { return r.id != self.item.id; });
    AppStorage.set("rappels[" + self.client.id + "]", rappels);

    var deleteRappel = AppStorage.get("delete_rappel");
    if (!deleteRappel) {
      deleteRappel = [];
    }
    deleteRappel.push(self.item.id);
    AppStorage.set("delete_rappel", deleteRappel);
  }

}
