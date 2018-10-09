import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Note } from '@store/model/note.model';
import { Store }        from '@ngxs/store';
import { Select } from '@ngxs/store';
import { FetchCollection } from '@store/action/collection.action';
import { CollectionState } from '@store/state/collection.state';
import { FetchCollected } from '@store/action/collected.action';


import { Observable, Subject, of } from 'rxjs';
import { finalize, take, tap, filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-collected-page',
  templateUrl: './collected-page.component.html',
  styleUrls: ['./collected-page.component.scss']
})
export class CollectedPageComponent implements OnInit {

	collectionId: string;
	notes: any;

  constructor( private store: Store, private route: ActivatedRoute ) { }

  ngOnInit() {
  	this.collectionId = this.route.snapshot.params.id;
    this.store.select(state => state.collected[this.collectionId]).subscribe(data => console.log(data));

  	this.store.select( CollectionState.getInitialized ).pipe(
        filter(initialized => !initialized),
        tap(() => this.store.dispatch(new FetchCollection()))
    ).subscribe()

    this.store.dispatch( new FetchCollected(this.collectionId) )
  }

}
