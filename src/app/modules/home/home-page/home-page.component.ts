import { Component, OnInit } from '@angular/core';
import { Note } from '@store/model/note.model';

import { Store }        from '@ngxs/store';
import { FetchCollection } from '@store/action/collection.action';
import { CollectionState } from '@store/state/collection.state';

import { TodayNoteState } from '@store/state/today-note.state';
import { FetchTodayNote } from '@store/action/today-note.action'

import { Observable, Subject, of } from 'rxjs';
import { finalize, take, tap, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {

    todayNote: Observable<any>;  
    yesterdayNote: Observable<any>;  
    collections: Observable<any>;

    constructor(private store: Store) { }
    
    ngOnInit() {
      
        this.store.select( CollectionState.getInitialized ).pipe(
            filter(initialized => !initialized),
            tap(() => this.store.dispatch(new FetchCollection()))
        ).subscribe()


        this.store.select( TodayNoteState.getInitialized ).pipe(
            filter(initialized => !initialized),
            tap(() => this.store.dispatch(new FetchTodayNote()))
        ).subscribe()

        this.collections = this.store.select( CollectionState.getCollection )
        this.todayNote = this.store.select( TodayNoteState.getTodayNote )
        // this.collections.subscribe(data => console.log(data))
    }

}
