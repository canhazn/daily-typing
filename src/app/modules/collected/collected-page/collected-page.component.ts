import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Note } from '@store/model/note.model';
import { Collected } from '../collected.model';

import { Store }        from '@ngxs/store';
import { FetchCollected } from '@store/action/collected.action';

import { CollectedService } from '../collected.service';

import { Observable, Subject, of, from} from 'rxjs';
import { finalize, take, tap, switchMap, concat, scan, map, debounceTime, flatMap, last, combineLatest} from 'rxjs/operators';

@Component({
  selector: 'app-collected-page',
  templateUrl: './collected-page.component.html',
  styleUrls: ['./collected-page.component.scss']
})
export class CollectedPageComponent implements OnInit {

	collectionId: string;
	notes: Observable<Note>[] = [];

  constructor( private store: Store, private route: ActivatedRoute, private collectedService: CollectedService) { }

  ngOnInit() {
  	this.collectionId = this.route.snapshot.params.id;
  	console.log(this.route.snapshot.params.id);
  	// this.collectedService.getCollectedService(this.collectionId).pipe(
  	// 	tap(data => console.log(data)),
  	// 	switchMap(collecteds => from(collecteds)),
   //    tap(note => console.log(note)),
   //    map((collected: Collected) => this.collectedService.getNote(collected.noteId)), 
   //    tap(data => console.log(data)),
   //    tap(note => this.notes.push(note)),
  	// ).subscribe();

    // this.store.dispatch(new FetchCollected(this.collectionId));
  }

}
