import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { ReviewState } from '@store/state/review.state';
import { FetchThisWeek } from '@store/action/review.action';

import { Observable, Subject, of } from 'rxjs';
import { finalize, take, tap, filter, map, switchMap, scan } from 'rxjs/operators';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.scss']
})
export class ThisWeekComponent implements OnInit {

	  notes = [];
  	constructor(private store: Store) { }

  	ngOnInit() {
  		this.store.select( ReviewState.getThisWeekInitialized ).pipe(
            filter(initialized => !initialized),
            switchMap(() => this.store.dispatch(new FetchThisWeek()))
        ).subscribe()

  	  this.store.select( ReviewState.getThisWeek ).pipe(
        // map(objectNotes =>  Object.values(objectNotes))
        tap( arrayNotes => {
          console.log(arrayNotes);
          console.log(this.notes);
          if (this.notes.length < arrayNotes.length) {
            this.notes = arrayNotes;
            return;
          }

          if (this.notes.length > arrayNotes.length) {
            this.notes = arrayNotes;
            return;
          }

          for(let i = 0; i <= this.notes.length - 1; i++) {
            if (Object.is(this.notes[i], arrayNotes[i])) {
              this.notes[i] = arrayNotes[i];
              return;
            }
          }

        })
      ).subscribe();


      // this.notes.subscribe(data => console.log(data))
      // this.store.select( ReviewState.getThisWeekInitialized ).subscribe(data => console.log('------------------------------------------------------',data))
  	}

}
