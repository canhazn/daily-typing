import { Component, OnInit, OnDestroy } from '@angular/core';
import { animation, trigger, transition, animate, style, state, query, stagger } from '@angular/animations';
import { topBarAnimation } from "@shared/animate/top-bar.animation";
import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { CollectionService } from '@store/service/collection.service';
import { Collection } from '@store/model/collection.model';

import { Observable, Subject, of, from } from 'rxjs';
import { finalize, take, tap, filter, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    animations: [
        trigger('fadeInDown', [
            transition('void => *', [
                style({ opacity: 0, transform: 'translateY(-2px)' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(200,style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class HomePageComponent implements OnInit {

    nowTime = new Date();
    todayNote: Observable<Note[]>;
    collections: Observable<Collection[]>;

    constructor(private noteService: NoteService, private collectionService: CollectionService) { }

    trackNote(index: number, element: Note) {
        return element ? element.noteId : null;
    }

    ngOnInit() {
        this.todayNote = this.noteService.todayNote;
        this.collections = this.collectionService.collections;
    }
}