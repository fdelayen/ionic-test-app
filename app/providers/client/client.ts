import {Injectable, Inject} from '@angular/core';
import {Subject, BehaviorSubject} from 'rxjs';

@Injectable()
export class Client {
  client: Subject<any> = new BehaviorSubject<any>(null);
  searchbar: Subject<string> = new BehaviorSubject<string>(null);

  getObservable() {
    return this.client;
  }

  getSearchBarObservable() {
    return this.searchbar;
  }
}
