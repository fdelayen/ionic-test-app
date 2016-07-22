import {NavParams} from 'ionic-angular';
import {TetraNavbar} from "../../components/tetra-navbar/tetra-navbar";
import * as _ from 'lodash';
import {AppStorage} from "../../providers/appStorage/appStorage";
import {Component} from "@angular/core";

@Component({
  templateUrl: 'build/pages/client-contacts/client-contacts.html',
  directives: [TetraNavbar]
})
export class ClientContacts {
  client: any;
  contacts: any[];

  constructor(private navParams: NavParams) {
    this.client = navParams.get('client');

    var contacts = _.chain(AppStorage.get("contacts[" + this.client.id + "]")).sortBy("nom").groupBy(function(c:any) {
      return c.nom.toUpperCase()[0];
    }).value();

    var contacts_arr = [];
    _.forIn(contacts, function(value, key) {
      value.unshift({divider: key});
      contacts_arr.push(value);
    });

    this.contacts = _.flatMap(contacts_arr);

  }
}
