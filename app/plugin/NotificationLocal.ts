export class NotificationLocal {
  static get() {
    var w:any = window;
    if(w.cordova && w.cordova.plugins.notification) {
      return w.cordova.plugins.notification.local;
    } else return;
  }
}
