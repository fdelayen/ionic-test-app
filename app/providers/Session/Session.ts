import {Injectable, Inject} from '@angular/core';
import {AppStorage} from "../appStorage/appStorage";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/Rx";

@Injectable()
export class Session {
  _token: any;
  _codeSociete: any;
  _tokenObs: Subject<any> = new BehaviorSubject<any>("");

  constructor() {
    /* Récupération du token */
    this.load();
  }

  load() {
    this._token = AppStorage.get("token") ? AppStorage.get("token") : {value: ""};
    this._codeSociete = AppStorage.get("codeSociete") ? AppStorage.get("codeSociete") : {value: ""};
    this._tokenObs.next(this._token.value);
  }

  getTokenObs() {
    return this._tokenObs;
  }

  get token() {
    this.load();
    return this._token.value;
  }

  set token(token) {
    this._token.value = token;
    this._tokenObs.next(this._token.value);
    AppStorage.set("token", this._token);
  }

  get codeSociete() {
    this.load();
    return this._codeSociete.value;
  }

  set codeSociete(code) {
    if(code) {
      this._codeSociete.value = code;
      AppStorage.set("codeSociete", this._codeSociete);
    }
  }
}
