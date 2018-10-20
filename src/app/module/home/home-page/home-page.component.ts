import { Component, OnInit, OnDestroy } from '@angular/core';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';


import { Observable, Subject, of } from 'rxjs';
import { finalize, take, tap, filter, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit, OnDestroy {

    today = new Date();
    todayNote: Observable<any>;  
    notes = [];
    yesterdayNote: Observable<any>;  
    collections: Observable<any>;

    subscribe: any;
    constructor(private noteService: NoteService, private collectionService: CollectionService) { }
    
    setNewNote() {
        this.noteService.setNewNote().subscribe();
    }

    trackNote(index: number, element: Note) {
        return element ? element.noteId : null;
    }

    ngOnInit() {
        this.todayNote = this.noteService.getTodayNote();
        this.collections = this.collectionService.getCollection();

        //   this.store.select( TodayNoteState.getTodayNote ).pipe(            
        //     tap( curr => {      
        //         if(!curr) curr =[];
        //         if (this.notes.length < curr.length) {
        //           let index = curr.length -1;                                     
        //           for( index; index >= 0; index--) 
        //             if (!this.notes.includes(curr[index]) ) this.notes.unshift(curr[index]);
        //         }

        //         if (this.notes.length > curr.length) {
        //           for ( let index = 0; index <= this.notes.length -1; index++) {
        //             if (!curr.includes(this.notes[index])) this.notes.splice(index, 1);
        //           }
        //         }

        //         if (this.notes.length == curr.length) {
        //           for(let i = 0; i <= this.notes.length - 1; i++) 
        //             if (this.notes[i] == curr[i]) this.notes[i] = curr[i];                              
        //         }

        //     })
        // ).subscribe()
    }

    ngOnDestroy() {
        // this.subscribe.unsubscribe()
    }
}
