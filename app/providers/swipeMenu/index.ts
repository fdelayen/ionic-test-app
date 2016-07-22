import {Injectable, Inject} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';

@Injectable()
export class SwipeMenu {
  swipeMenu: Subject<any> = new BehaviorSubject<any>(true);

  getObservable() {
    return this.swipeMenu;
  }
}
