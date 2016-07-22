import {Injectable} from '@angular/core';
import {AppStorage} from "../appStorage/appStorage";
import {Platform} from 'ionic-angular';
import * as _ from 'lodash';
import * as moment from 'moment';
import {Session} from "../Session/Session";
import {BehaviorSubject} from "rxjs/Rx";
import {Subject} from "rxjs/Subject";
import {NotificationLocal} from "../../plugin/NotificationLocal";

@Injectable()
export class Sync {

  constructor(private session: Session, private platform: Platform) {
    Sync.session = session;
    Sync.platform = platform;
    Sync.status = new BehaviorSubject<string>("");
    Sync.running = new BehaviorSubject<boolean>(false);
    Sync.init();
    Sync.retryTime = 1800000; // 30min sync
    Sync.quickRetryTime = 1800000; // 30min retry sync
  }

  static platform: Platform;
  static session: Session;
  static retryTime: number;
  static quickRetryTime: number;
  static status: Subject<string>;
  static running: Subject<boolean>;

  static init() {
    Sync.run().catch((err) => {
      console.log(err);
    });
  }

  static retry(quick:boolean = false) {
    setTimeout(() => {
      Sync.run();
    }, quick ? Sync.quickRetryTime : Sync.retryTime);
  }

  static keysToSend = [];

  static login() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  static run() {
    Sync.status.next("Connexion...");
    Sync.running.next(true);
    return new Promise((resolve, reject) => {
      Sync.login().then(() => {
        console.log("Sync...");
        Sync.status.next("Préparation des données...");

        Sync.status.next("Transmission...");

        Sync.status.next("Synchronisation terminée avec succès");
        Sync.running.next(false);
        resolve();
      });
    });
  }
}
