import { Component, OnInit } from '@angular/core';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-yesterday',
  templateUrl: './yesterday.component.html',
  styleUrls: ['./yesterday.component.scss']
})
export class YesterdayComponent implements OnInit {

	yesterdayNotes: Observable<any>;	
	randomNote: Observable<any>;
	constructor(private noteService: NoteService) { }

	trackNote(index: number, element: Note) {
        return element ? element.noteId : null;
    }
    
	ngOnInit() {
		this.yesterdayNotes = this.noteService.getYesterdayNote();
		
		this.randomNote = this.noteService.getRandomLikedNote();
	}

}
