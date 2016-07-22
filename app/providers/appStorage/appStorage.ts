import {Injectable} from "@angular/core";
import * as _ from 'lodash';

@Injectable()
export class AppStorage {
  constructor() {
    AppStorage.initSample();
  }

  public static get(name: string, id: number = null, key: string = "id") {
    let res = JSON.parse(localStorage.getItem(name));
    return id ? _.filter(res, function(i) {return i[key] == id;}) : res;
  }

  public static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getArrayOrEmptyArray(name: string, id: number) {
    let res = AppStorage.get(name + (id ? '[' + id + ']' : ''));
    return res ? res : [];
  }

  public static getKeys() {
    return Object.keys(localStorage);
  }

  private static initSample() {

    if(!this.get('profils')) {
      this.set('profils', [
        {"id": 1, "nom": "client", "nomaffiche": "List", "ordre": 1}
      ])
    }

    if(!this.get('clients')) {
      let clients = [];

      for(let i=0; i<200; i++) {
        clients.push({"id":i,"nom":`Test ${i}`, "profil_id": 1,"parent_id":null,"parent":[]});
      }

      this.set('clients', clients);
    }

    if(!this.get('contacts[1]')) {
      let contacts = [
        {"id":1,"nom":"Contact","profil_id":null,"parent_id":null,"parent":[]}
      ];
      this.set('contacts[1]', contacts);
    }

    if(!this.get('actualites')) {
      let actualites = [
        {"id":1,"titre":"Bienvenue dans l'ionic test app",
         "contenu": "<p><b>Super </b>ionic app.</p>",
         "date":"16/03/2016"
        }
      ];
      this.set('actualites', actualites);
    }

  }
}
