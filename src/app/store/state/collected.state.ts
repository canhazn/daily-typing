import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { AuthState } from '@store/state/auth.state';
import {
	FetchCollected,
	PatchCollected,
	CreateCollected,
	UpdateCollected,
} from '@store/action/collected.action';

import { CollectedStateModel, Collected } from '@store/model/collected.model';
import { from } from 'rxjs';
import { take, tap, map, timeout, switchMap } from 'rxjs/operators';


@State<CollectedStateModel> ({
	name: 'collected',	
	// defaults: {
	// 	// collecteds: []
	// }
})
export class CollectedState{
	constructor(private store: Store, private afs: AngularFirestore) {}

	@Action(FetchCollected) 
	fetchCollected(ctx: StateContext<CollectedStateModel>, event: FetchCollected) {
		let path = `/user/4WqM66LHaLWQ8O4TIlF58mUonj62/collection/${event.collectionId}/collected`;

		// this.afs.collection(path).valueChanges().pipe(
	 //  		tap(data => console.log(data)),
	 //  		switchMap(collecteds => from(collecteds)),
	 //      tap(note => console.log(note)),
	 //      map((collected: Collected) => this.collectedService.getNote(collected.noteId)), 
	 //      tap(data => console.log(data)),
	 //      tap(note => this.notes.push(note)),
	 //  	).subscribe();

		return this.afs.collection(path).stateChanges(['added']).pipe(			
			// take(1),
			map(actions => actions.map(a => {
		      let product = a.payload.doc.data() as Collected;
		      return product;		      
		    })),
			// tap(data => console.log(data)),
			tap(data => ctx.dispatch( 
				new PatchCollected({ 
					collectionId : event.collectionId, 
					arrayCollected: data 
				})
			)),			
		)
	}

	@Action(PatchCollected)
	PatchCollected(ctx: StateContext<CollectedStateModel>, event: PatchCollected) {
		console.log(event)
		let collected = {
			// collectionId : event.patchData.collectionId,
			[event.patchData.collectionId]: event.patchData.arrayCollected
		}
		ctx.patchState(collected)
	}

}