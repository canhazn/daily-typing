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
    collections: Observable<any>;
    
    constructor(private noteService: NoteService, private collectionService: CollectionService) { }
    
    createNote() {
        this.noteService.createNote().subscribe();
    }

    trackNote(index: number, element: Note) {
        return element ? element.noteId : null;
    }

    ngOnInit() {
        this.todayNote = this.noteService.todayNote;
        this.collections = this.collectionService.collections;
    }

    ngOnDestroy() {
        // this.subscribe.unsubscribe()
    }
}
