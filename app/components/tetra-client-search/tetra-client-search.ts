import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {TabsClientPage} from "../../pages/client-tabs/client-tabs";
import * as _ from 'lodash';
import {AppStorage} from "../../providers/appStorage/appStorage";
import {Client} from "../../providers/client/client";
import {TetraNavbar} from "../../components/tetra-navbar/tetra-navbar";
import {TetraClientSearchBar} from "../../components/tetra-client-search-bar/tetra-client-search-bar";

@Component({
  selector: 'tetra-client-search',
  templateUrl: 'build/components/tetra-client-search/tetra-client-search.html',
  directives: [IONIC_DIRECTIVES, TetraNavbar, TetraClientSearchBar]
})
export class TetraClientSearch {
  clientsComplete: Array<Object>;
  clients: any[];
  profilFilter:any = null;

  @Input('client') client:Object;
  @Output('client') clientOut = new EventEmitter();
  @Output() selected = new EventEmitter();

  constructor(private nav: NavController, private navParams: NavParams, private clientProvider: Client) {
    this.profilFilter = navParams.get('profil');

    this.clientsComplete = this.profilFilter ?
      _.filter(AppStorage.get("clients"), (c:any) => { return c.profil_id == this.profilFilter.id; })
      : AppStorage.get("clients");

    this.updateClients(this.clientsComplete);

    this.clientProvider.getSearchBarObservable().subscribe((query) => {
      this.searchClient(query);
    });
  }

  updateClients(list:any) {
    var clients = _.chain(list).sortBy("nom").groupBy(function(c:any) {
      return c.nom.toUpperCase()[0];
    }).value();

    var clients_arr = [];
    _.forIn(clients, function(value, key) {
      value.unshift({divider: key});
      clients_arr.push(value);
    });

    this.clients =_.flatMap(clients_arr);
  }

  itemTapped(event, client) {
    this.client = client;
    this.clientOut.emit(client);
    this.selected.emit(client);
  }

  searchClient(query) {

    var clients = [];

    if(query && query != "") {
      clients = _.filter(this.clientsComplete, function(c) {
        var vals = [];
        _.forIn(c, function(value) {
          vals.push(value);
        });

        if(JSON.stringify(vals)) {
          return JSON.stringify(vals).toLowerCase().includes(query.toLowerCase());
        } else return false;
      });
    }
    else {
      clients = this.clientsComplete;
    }
    this.updateClients(clients);
  }

}
