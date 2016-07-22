import {TetraNavbar} from "../../components/tetra-navbar/tetra-navbar";
import {ClientDetailsInformations} from "../client-detail-informations/client-detail-informations";
import {NavParams} from "../../../node_modules/ionic-angular/components/nav/nav-params";
import {ClientDetailsRappel} from "../client-detail-rappel/client-detail-rappel";
import {ClientDetailsRapport} from "../client-detail-rapport/client-detail-rapport";
import {TetraClientSearch} from "../../components/tetra-client-search/tetra-client-search";
import {Client} from "../../providers/client/client";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'build/pages/client-tabs/client-tabs.html',
  directives: [TetraNavbar, TetraClientSearch]
})
export class TabsClientPage {
  tabs: Array<{title: string, icon: string, component: any}>;
  params: Object;
  client: any = {};
  map: boolean = true;

  constructor(private navParams: NavParams, private clientProvider: Client) {

    this.params = {client: true};

    clientProvider.getObservable().subscribe((client) => {
      this.client = client;
    });

    this.tabs = [
      { title: 'Informations', icon: 'information', component: ClientDetailsInformations },
      { title: 'Rappels', icon: 'calendar', component: ClientDetailsRappel },
      { title: 'Rapports', icon: 'clipboard', component: ClientDetailsRapport }
    ];

    if(navParams.get('map')) {
      this.tabs.splice(1, 1);
      this.map = false;
    }
  }

  selected(event) {
    this.clientProvider.getObservable().next(event);
  }

  ionViewWillLeave(): void {
    //this.mapProvider.close();
  }
}
