import {Component} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';

import {Client} from "../../providers/client/client";

@Component({
  selector: 'tetra-client-search-bar',
  templateUrl: 'build/components/tetra-client-search-bar/tetra-client-search-bar.html',
  directives: [IONIC_DIRECTIVES]
})
export class TetraClientSearchBar {
  searchQuery: string;

  constructor(private nav: NavController, navParams: NavParams, private clientProvider: Client) {
    this.clientProvider.getSearchBarObservable().next("");
  }

  searchClient(event) {
    if(event.target && event.target.value) {
      this.clientProvider.getSearchBarObservable().next(event.target.value);
    }
    else {
      this.clientProvider.getSearchBarObservable().next("");
    }
  }

}
