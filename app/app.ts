///<reference path="../typings/tsd.d.ts"/>

import {ViewChild, Component} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, App} from 'ionic-angular';
import {ClientPage} from "./pages/client/client";
import {ActualitePage} from "./pages/actualite/actualite";
import {AboutPage} from "./pages/about/about";
import {DeconnexionPage} from "./pages/deconnexion/deconnexion";
import {AppStorage} from "./providers/appStorage/appStorage";
import {NotificationLocal} from "./plugin/NotificationLocal";
import {ClientDetailsRappelDetail} from "./pages/client-detail-rappel-detail/client-detail-rappel-detail";
import {Login} from "./pages/login/login";
import {Session} from "./providers/Session/Session";
import {Client} from "./providers/client/client";
import {Sync} from "./providers/sync/sync";
import {SynchroniserPage} from "./pages/synchroniser/synchroniser";
import {StatusBar} from "ionic-native/dist/index";
import {SwipeMenu} from './providers/swipeMenu'
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
class MyApp {
  // make ClientPage the root (or first) page
  rootPage: any = Login;
  pages: Array<{title: string, component: any}>;
  pagesBase: Array<{title: string, component: any}>;
  nav: any;
  swipeBool: boolean = true;

  constructor(
    private app: App,
    private platform: Platform,
    private menu: MenuController,
    private storage: AppStorage,
    private sync: Sync,
    private session: Session,
    private swipeMenu: SwipeMenu
  ) {
    this.initializeApp();

    this.swipeMenu.getObservable().subscribe(r => this.swipeBool = r);

    /* Chargement des profils */
    let profilsPages = this.loadProfils();

    this.pagesBase = [
      { title: 'Actualités', component: ActualitePage },
      { title: 'Synchroniser', component: SynchroniserPage },
      { title: 'À propos', component: AboutPage },
      { title: 'Déconnexion', component: DeconnexionPage }
    ];

    // set our app's pages
    this.pages = [
      ...profilsPages,
      ...this.pagesBase
    ];

    Sync.running.subscribe(() => {
      let profilsPages = this.loadProfils();
      this.pages = [
        ...profilsPages,
        ...this.pagesBase
      ];
    });

    this.session.getTokenObs().subscribe((token) => {
      if(!token || token == "") {
        this.menu.enable(false);
      } else {
        this.menu.enable(true);
      }
    });
  }

  initializeApp() {

    /* Connexion aux notifications si possible */
    if(!this.platform.is('ios')) {
      this.initNotif();
    }

    this.platform.ready().then(() => {

      window.onerror = function(e) {
        console.log('error', e);
        return true;
      };

      if(this.platform.is('ios')) {
        this.menu.swipeEnable(false);
      }

      /* Connexion aux notifications si possible */
      if(this.platform.is('ios')) {
        this.initNotif();
      }

      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
       StatusBar.backgroundColorByHexString("#1968ea");
    });
  }

  initNotif() {
    var notif = NotificationLocal.get();
    if (notif) {
      notif.on("click", (n) => {
        if(n.data && JSON.parse(n.data).url) {
          /* Notif de mise à jour */
          this.platform.is('android') && window.open(JSON.parse(n.data).url, '_blank');
          return;
        }

        this.nav.setRoot(ClientDetailsRappelDetail, {
          item: n,
          modifier: false
        });
      });
    }
  }

  loadProfils() {
    let profils:any = _.map(AppStorage.get('profils'), (p:any) => {
      return { title: p.nomaffiche, component: ClientPage, params: {profil: p} };
    });

    return (profils.length > 0) ? profils : { title: 'Clients', component: ClientPage };
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, page.params);
  }
}

ionicBootstrap(MyApp, [AppStorage, Session, Client, Sync, SwipeMenu], {});
