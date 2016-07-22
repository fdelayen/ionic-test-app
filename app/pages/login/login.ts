import {NavParams, NavController, Alert} from 'ionic-angular';
import {TetraNavbar} from "../../components/tetra-navbar/tetra-navbar";
import {ClientPage} from "../client/client";
import {Session} from "../../providers/Session/Session";
import {Component} from "@angular/core";
import {AppStorage} from "../../providers/appStorage/appStorage";

@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [TetraNavbar],
  providers: []
})
export class Login {
  user: any;
  loading: boolean;
  needLogin: boolean;
  profil: any = null;

  constructor(private navParams: NavParams, private nav: NavController,
              private session: Session) {
    this.user = {};
    this.loading = false;
    this.needLogin = false;

    this.profil = this.loadProfil();

    if(this.session.codeSociete != "") {
      this.user.codeSociete = this.session.codeSociete;
    }

    if(this.session.token != "") {
      this.nav.setRoot(ClientPage, {profil: this.profil});
    } else {
      this.needLogin = true;
    }
  }

  login() {
    // this.nav.setRoot(ClientPage);
    var self = this;
    this.loading = true;
    this.session.codeSociete = this.user.codeSociete;
    self.session.token = '05461564156486563102';
    self.nav.setRoot(ClientPage, {profil: this.profil});
  }

  loginError(err) {
    this.loading = false;
    let alert = Alert.create({
      title: 'Erreur',
      subTitle: 'La connexion a échoué',
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }

  loadProfil() {
    let profils = AppStorage.get('profils');
    return (profils.length > 0) ? profils[0] : null;
  }
}
