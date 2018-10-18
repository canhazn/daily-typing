import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { ReviewState } from '@store/state/review.state';
import { FetchThisWeek } from '@store/action/review.action';

import { Observable, Subject, of } from 'rxjs';
import { finalize, take, tap, filter, map, switchMap, scan } from 'rxjs/operators';

export interface Array<T> {
   update(o: T): Array<T>;
}

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.scss']
})
export class ThisWeekComponent implements OnInit {

	  notes = [];
  	constructor(private store: Store) { }

    // updateArray(old: [], curr: []) {
    //   if (old.length < curr.length) {
    //     let index = curr.length -1;                                     
    //     for( index; index >= 0; index--) 
    //       if (!old.includes(curr[index]) ) old.push(curr[index]);     
    //   }

    //   if (old.length > curr.length) {
    //     for ( let index = 0; index <= old.length -1; index++) {
    //       if (!curr.includes(old[index])) old.splice(index, 1);
    //     }
    //   }

    //   if (old.length == curr.length) {
    //     for(let i = 0; i <= old.length - 1; i++) 
    //       if (old[i] == curr[i]) old[i] = curr[i];                              
    //   }
    // }

  	ngOnInit() {
  		this.store.select( ReviewState.getThisWeekInitialized ).pipe(
        filter(initialized => !initialized),
        switchMap(() => this.store.dispatch(new FetchThisWeek()))
      ).subscribe()

  	  this.store.select( ReviewState.getThisWeek ).pipe(        
        tap( curr => {        
          if (this.notes.length < curr.length) {
            let index = curr.length -1;                                     
            for( index; index >= 0; index--) 
              if (!this.notes.includes(curr[index]) ) this.notes.push(curr[index]);
          }

          if (this.notes.length > curr.length) {
            for ( let index = 0; index <= this.notes.length -1; index++) {
              if (!curr.includes(this.notes[index])) this.notes.splice(index, 1);
            }
          }

          if (this.notes.length == curr.length) {
            for(let i = 0; i <= this.notes.length - 1; i++) 
              if (this.notes[i] == curr[i]) this.notes[i] = curr[i];                              
          }

        })
      ).subscribe();
  	}
}
