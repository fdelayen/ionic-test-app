import {NavParams, Platform} from 'ionic-angular';
import {TetraNavbar} from '../../components/tetra-navbar/tetra-navbar';
import {TetraClientSearch} from '../../components/tetra-client-search/tetra-client-search';
import {TetraClientSearchBar} from '../../components/tetra-client-search-bar/tetra-client-search-bar';
import {NavController} from '../../../node_modules/ionic-angular/components/nav/nav-controller';
import {ClientContacts} from '../client-contacts/client-contacts';
import {Client} from "../../providers/client/client";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'build/pages/client-detail-informations/client-detail-informations.html',
  directives: [TetraNavbar, TetraClientSearch, TetraClientSearchBar]
})
export class ClientDetailsInformations {
  client: any = {};

  constructor(private navParams: NavParams, private nav: NavController, private platform: Platform,
              private clientProvider: Client) {

    clientProvider.getObservable().subscribe((client) => {
      this.client = client;
    });
  }

  openContacts() {
    this.nav.push(ClientContacts, {
      client: this.client
    });
  }
}
