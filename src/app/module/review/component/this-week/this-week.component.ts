import { Component, OnInit } from '@angular/core';

import { Note } from '@store/model/note.model';

import { NoteService } from '@store/service/note.service';

import { Observable, Subject, of } from 'rxjs';
import { finalize, take, tap, filter, map, switchMap, scan } from 'rxjs/operators';

@Component({
  selector: 'app-this-week',
  templateUrl: './this-week.component.html',
  styleUrls: ['./this-week.component.scss']
})
export class ThisWeekComponent implements OnInit {

	  notes : Observable<any>;
  	constructor(private noteService: NoteService) { }

    trackNote(index: number, element: Note) {
        return element ? element.noteId : null;
    }

  	ngOnInit() {
  	  
      this.notes = this.noteService.getThisWeek();
  	}
}
