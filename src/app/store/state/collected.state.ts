import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { CollectionState } from '@store/state/collection.state';
import { CollectionService } from '@store/service/collection.service';
import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';
import {
	FetchCollected,
	PatchCollected,
	ResetCollected,
	AddedNote,
	ModifiedNote,
	RemovedNote,
} from '@store/action/collected.action';

import { CollectedStateModel } from '@store/model/collected.model';
import { Observable, Subject, of, from } from 'rxjs';
import { map, pairwise, take, tap, filter, switchMap, skip, distinctUntilChanged, flatMap, scan, pluck } from 'rxjs/operators';


@State<CollectedStateModel> ({
	name: 'collected',	
	defaults: {
		// collecteds: []
	}
})
export class CollectedState{
	constructor(private store: Store, private noteService: NoteService, private collectionService: CollectionService) {}

	@Action(FetchCollected) 
	fetchCollected(ctx: StateContext<CollectedStateModel>, event: FetchCollected) {

		let state = ctx.getState();

		ctx.patchState({		
			[event.collectionId] : {
				// initialized: false,
				entity : []
			}
		});

		// if(!state[event.collectionId]) state[event.collectionId] = [];
		
		return this.collectionService.getCollectionById(event.collectionId).pipe(
			map(collection => collection.arrayNoteId.map( noteId => this.noteService.getNoteById(noteId))),						
			tap(observableNote => ctx.dispatch(new PatchCollected(observableNote, event.collectionId))),
			// distinctUntilChanged(),
			// tap(() => ctx.dispatch(new ResetCollected(event.collectionId) )),
			// switchMap(arrayNoteId => from(arrayNoteId)),
			// flatMap(noteId => this.noteService.getNoteById(noteId).pipe(
			// 		map(([action]) => action),
			// 		tap(action => {
			// 			if (action.type == 'added') 
			// 			ctx.dispatch( new AddedNote(action.payload.doc.data() as Note, event.collectionId))
			// 		}),
			// 		tap(action => {
			// 			if (action.type == 'modified') 
			// 			ctx.dispatch(new ModifiedNote(action.payload.doc.data() as Note, event.collectionId))
			// 		}),
			// 		// tap(action => {
			// 		// 	if (action.type == 'removed')
			// 		// 	ctx.dispatch(new RemovedNote(action.payload.doc.id, event.collectionId))
			// 		// })
			// 	)
			// ),
		)
	}

	@Action(PatchCollected)
	patchCollected(ctx: StateContext<CollectedStateModel>, event: PatchCollected) {
		let state = ctx.getState();
		// if (!state[event.collectionId]) state[event.collectionId] = [];
		// state[event.collectionId] = event.arrayObservableNote

		// state[event.collectionId] = {
		// 	entity: ['dsa', 'mcxz', 100]
		// }

		// let curr = {
		// 	[event.collectionId] : {
		// 		entity : event.arrayObservableNote
		// 	}
		// }

		ctx.patchState({		
			[event.collectionId] : {
				// initialized: true,
				entity : event.arrayObservableNote
			}
		});
	}

	// @Action(AddedNote)
	// addedNote(ctx: StateContext<CollectedStateModel>, event: AddedNote) {
	// 	let state = ctx.getState();
	// 	// state[event.collectionId] = [...state[event.collectionId], event.note]
	// 	// console.log("collected: " );
	// }

	// @Action(ModifiedNote)
	// modifiedNote(ctx: StateContext<CollectedStateModel>, event: ModifiedNote) {
	// 	let state = ctx.getState();
	// 	// if (!state[event.collectionId]) state[event.collectionId] = [];
	// 	state[event.collectionId] = state[event.collectionId].map(note => { 
	// 		if (note.noteId == event.note.noteId) return event.note; 
	// 		return note;
	// 	})

	// 	// console.log("collected: " );
	// }

	// @Action(ResetCollected)
	// resetCollected(ctx: StateContext<CollectedStateModel>, event: ResetCollected) {
	// 	let state = ctx.getState();
	// 	// if (!state[event.collectionId]) state[event.collectionId] = [];
	// 	// console.log("reset");
	// 	state[event.collectionId] = []
	// }
}