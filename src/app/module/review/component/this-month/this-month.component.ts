import { Component, OnInit } from '@angular/core';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-this-month',
  templateUrl: './this-month.component.html',
  styleUrls: ['./this-month.component.scss']
})
export class ThisMonthComponent implements OnInit {

	notes: Observable<any>;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
  	this.notes = this.noteService.fetchThisMonth();
  }

}
