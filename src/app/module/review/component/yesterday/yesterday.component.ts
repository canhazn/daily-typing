import { Component, OnInit } from '@angular/core';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, tap, filter, delay } from 'rxjs/operators';
@Component({
	selector: 'app-yesterday',
	templateUrl: './yesterday.component.html',
	styleUrls: ['./yesterday.component.scss']
})
export class YesterdayComponent implements OnInit {

	yesterdayNotes: Observable<any>;
	randomNote: Observable<any>;
	private _state = new BehaviorSubject<"init" | "running" | "done" | null>('init');

	state = this._state.asObservable();
	constructor(private noteService: NoteService) { }

	trackNote(index: number, element: Note) {
		return element ? element.noteId : null;
	}

	getRandomLikedNote() {
		this._state.next("running");
	}

	ngOnInit() {
		this.yesterdayNotes = this.noteService.getYesterdayNote();

		this.randomNote = this.noteService.getRandomLikedNote();

		this._state.pipe(
			filter(state => state == 'running'),			
			switchMap(_ => this.noteService.getRandomLikedNote()),
			tap(note => {
				this.randomNote = of(note);
				this._state.next('done')
			}),
			delay(2000),
			tap(_ => this._state.next('init')),
		).subscribe();

	}

}
