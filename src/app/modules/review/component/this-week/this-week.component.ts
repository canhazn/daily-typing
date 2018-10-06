import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { ReviewState } from '@store/state/review.state';
import { FetchThisWeek } from '@store/action/review.action';

import { Observable, Subject, of } from 'rxjs';
import { finalize, take, tap, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.scss']
})
export class ThisWeekComponent implements OnInit {

	notes : Observable<any>
  	constructor(private store: Store) { }

  	ngOnInit() {
  		this.store.select( ReviewState.getThisWeekInitialized ).pipe(
            filter(initialized => !initialized),
            tap(() => this.store.dispatch(new FetchThisWeek()))
        ).subscribe()

  		this.notes = this.store.select( ReviewState.getThisWeek );
  	}

}
