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

	yesterday: Observable<any>;	
	randomNote: Observable<any>;
	constructor(private noteService: NoteService) { }

	ngOnInit() {
		this.yesterday = this.noteService.getYesterdayNote();
		
		this.randomNote = this.noteService.getRandomLikedNote();
	}

}
