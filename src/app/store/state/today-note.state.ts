import { ApplicationRef } from '@angular/core';
import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';


import {
	FetchTodayNote,
	AddedTodayNote,
	ModifiedTodayNote,
	RemovedTodayNote,

} from '@store/action/today-note.action';
import { of, from } from 'rxjs';
import { take, tap, map, timeout, switchMap } from 'rxjs/operators';


export interface TodayNoteStateModel {
	initialized: boolean,
	entity?: Note,
}

@State<TodayNoteStateModel> ({
	name: 'todayNote',	
	defaults: {
		initialized: false,
	},
})
export class TodayNoteState {
	constructor(private store: Store, private noteService: NoteService) {}

	@Selector()
  	static getInitialized(state: TodayNoteStateModel): boolean {
    	return state.initialized;
  	}
	@Selector()
	static getTodayNote(state: TodayNoteStateModel) {
		return state.entity;
	}

	@Action(FetchTodayNote)
	fetchTodayNote(ctx: StateContext<TodayNoteStateModel>) {
		return this.noteService.getTodayNote().pipe(
			// tap(note => ctx.dispatch(new PatchTodayNote(note)))
			switchMap(actions => from(actions)),
			tap(action => {
				if (action.type == 'added') 
				ctx.dispatch(new AddedTodayNote(action.payload.doc.data() as Note))
			}),
			tap(action => {
				if (action.type == 'modified') 
				ctx.dispatch(new ModifiedTodayNote(action.payload.doc.data() as Note))
			}),
			tap(action => {
				if (action.type == 'removed')
				ctx.dispatch(new RemovedTodayNote(action.payload.doc.id))
			})
		)
	}

	@Action(AddedTodayNote)
	patchTodayNote(ctx: StateContext<TodayNoteStateModel>, event: AddedTodayNote) {
		ctx.patchState({
			initialized: true,
			entity: event.note
		});
	}

	@Action(ModifiedTodayNote)
	modifiedCollection(ctx: StateContext<TodayNoteStateModel>, event: ModifiedTodayNote) {

		let modified = event.note;

		// let newState = ctx.getState().entity.map(note => { 
		// 	if (note.noteId == modified.noteId) return modified; 
		// 	return note;
		// })

		ctx.patchState({
			entity: modified
		})
	}
}