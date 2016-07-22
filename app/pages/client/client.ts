import {NavController, NavParams} from 'ionic-angular';
import {TabsClientPage} from "../client-tabs/client-tabs";
import {TetraNavbar} from "../../components/tetra-navbar/tetra-navbar";
import {TetraClientSearch} from "../../components/tetra-client-search/tetra-client-search";
import {TetraClientSearchBar} from "../../components/tetra-client-search-bar/tetra-client-search-bar";
import {Client} from "../../providers/client/client";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'build/pages/client/client.html',
  directives: [TetraNavbar, TetraClientSearch, TetraClientSearchBar]
})
export class ClientPage {
  client: any = {};
  profilFilter: any = null;
  nom: string = "Clients";
  clients: any = [{}, {}, {}, {}];

  constructor(private nav: NavController, private clientProvider: Client, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');
    this.profilFilter = navParams.get('profil');
    if(this.profilFilter) {
      this.nom = this.profilFilter.nomaffiche;
    }
  }

  selected(event) {
    this.client = event;
    this.clientProvider.getObservable().next(this.client);
    this.nav.push(TabsClientPage, {profil: this.profilFilter});
  }

}
