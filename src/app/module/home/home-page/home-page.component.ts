import { Component, OnInit } from '@angular/core';
import { Note } from '@store/model/note.model';

import { Store }        from '@ngxs/store';
import { FetchCollection } from '@store/action/collection.action';
import { CollectionState } from '@store/state/collection.state';
import { NoteService } from '@store/service/note.service';
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
    notes = [];
    yesterdayNote: Observable<any>;  
    collections: Observable<any>;

    constructor(private store: Store, private noteService: NoteService) { }
    
    setNewNote() {
        this.noteService.setNewNote().subscribe();
    }

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
        // this.collections = this.collectionService.fetchCollect();

        this.store.select( TodayNoteState.getTodayNote ).pipe(
            tap( curr => {        
                if (this.notes.length < curr.length) {
                  let index = curr.length -1;                                     
                  for( index; index >= 0; index--) 
                    if (!this.notes.includes(curr[index]) ) this.notes.unshift(curr[index]);
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
        ).subscribe()
    }

}
