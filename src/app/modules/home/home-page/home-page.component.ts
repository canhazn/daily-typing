import { Component, OnInit } from '@angular/core';
import { Note } from '@store/model/note.model';

import { Store }        from '@ngxs/store';
import { FetchCollection } from '@store/action/collection.action';
import { CollectionState } from '@store/state/collection.state';
import { Collection } from '@store/model/collection.model';

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
    collections: Collection[] = [];

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

        this.store.select( CollectionState.getCollection ).pipe(
            tap(curr => {
                if (this.collections.length < curr.length) {
                  let index = curr.length -1;                                     
                  for( index; index >= 0; index--) 
                      if (!this.collections.includes(curr[index]) ) this.collections.push(curr[index]);                
                }

                if (this.collections.length > curr.length) {
                  for ( let index = 0; index <= this.collections.length -1; index++) {
                    if (!curr.includes(this.collections[index])) this.collections.splice(index, 1);
                  }
                }

                if (this.collections.length == curr.length) {
                  for(let i = 0; i <= this.collections.length - 1; i++) 
                    if (this.collections[i] == curr[i]) this.collections[i] = curr[i];                              
                }
            })
        ).subscribe();


        this.todayNote = this.store.select( TodayNoteState.getTodayNote )
        // this.collections.subscribe(data => console.log(data))
    }

}
