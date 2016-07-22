import {TetraNavbar} from "../../components/tetra-navbar/tetra-navbar";
import {AppStorage} from "../../providers/appStorage/appStorage";
import * as moment from 'moment';
import {Sync} from "../../providers/sync/sync";
import {Component} from "@angular/core";
require('moment/locale/fr');
moment.locale("fr");

@Component({
  templateUrl: 'build/pages/synchroniser/synchroniser.html',
  directives: [TetraNavbar]
})
export class SynchroniserPage {
  sync:any;
  running:boolean;
  status:string;

  constructor() {
    this.sync = AppStorage.get("sync");

    if(this.sync && this.sync.date) {
      this.sync.date = moment(this.sync.date).format("LLLL");
    } else if(!this.sync) {
      this.sync = {};
    }

    Sync.status.subscribe((status) => {
      this.status = status;
    });

    Sync.running.subscribe((running) => {
      this.running = running;
    });
  }

  synchroniser() {
    Sync.run().then(() => {
      this.sync = AppStorage.get("sync");

      if(this.sync && this.sync.date) {
        this.sync.date = moment(this.sync.date).format("LLLL");
      }
    }).catch(() => {
    });
  }
}
