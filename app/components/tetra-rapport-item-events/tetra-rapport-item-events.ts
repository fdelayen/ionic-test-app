import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import * as _ from 'lodash';
import * as moment from 'moment';
require('moment/locale/fr');
moment.locale("fr");

@Component({
  selector: 'tetra-rapport-item-events',
  templateUrl: 'build/components/tetra-rapport-item-events/tetra-rapport-item-events.html',
  directives: [IONIC_DIRECTIVES]
})
export class TetraRapportItemEvents {

  value:any = [];
  moment:any;
  @Input('value') defaultValue:any = null;
  @Input('disabled') disabled:boolean = false;
  @Output('onchange') onchange = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if(this.defaultValue) {
      this.value = JSON.parse(this.defaultValue);
    }
  }

  inputChanged() {
    /* Generate output */
    let val = JSON.stringify(this.value);
    this.onchange.emit(val);
  }

  removeItem(index) {
    this.value.splice(index, 1);
    this.inputChanged();
  }

  addItem() {
    this.value.push({time: moment().format(), event: ""});
    this.inputChanged();
  }

}
