import {TetraNavbar} from "../../components/tetra-navbar/tetra-navbar";
import {AppStorage} from "../../providers/appStorage/appStorage";
import * as moment from 'moment';
import {Component} from "@angular/core";
require('moment/locale/fr');
moment.locale("fr");

@Component({
  templateUrl: 'build/pages/actualite/actualite.html',
  directives: [TetraNavbar]
})
export class ActualitePage {
  actualites:any;

  constructor() {
    this.actualites = AppStorage.get("actualites");

    for(let a of this.actualites) {
      if(a.date) {
        a.date = moment(a.date).format("dddd D MMMM YYYY");
      }
    }
  }
}
