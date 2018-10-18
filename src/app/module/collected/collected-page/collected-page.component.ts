import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Note } from '@store/model/note.model';
import { Store }        from '@ngxs/store';
import { Location } from '@angular/common';
import { Select } from '@ngxs/store';
import { FetchCollection } from '@store/action/collection.action';
import { CollectionState } from '@store/state/collection.state';
import { FetchCollected } from '@store/action/collected.action';


import { Observable, Subject, of } from 'rxjs';
import { finalize, take, tap, filter, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-collected-page',
  templateUrl: './collected-page.component.html',
  styleUrls: ['./collected-page.component.scss']
})
export class CollectedPageComponent implements OnInit {

	collectionId: string;
  colection: any;
	notes: Observable<any>;

  constructor( private store: Store, private location: Location, private route: ActivatedRoute ) { }

  goBack(): void {
      this.location.back();
  }

  ngOnInit() {
  	this.collectionId = this.route.snapshot.params.id;
  // this.store.select(state => state.collected[this.collectionId]).subscribe(data => console.log(data));



    this.store.select( state => state.collected[this.collectionId] ).pipe(
      filter(initialized => !initialized),
      tap(() => this.store.dispatch( new FetchCollected(this.collectionId) ))
    ).subscribe()

    // this.colection = this.store.select(state => state.collection)
    this.notes = this.store.select(state => state.collected[this.collectionId].entity);    
    this.notes.subscribe(data => console.log("notes compontent", data))
  }

}
