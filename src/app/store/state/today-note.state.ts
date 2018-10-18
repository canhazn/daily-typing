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
	entity?: Note[],
}

@State<TodayNoteStateModel> ({
	name: 'todayNote',	
	defaults: {
		initialized: false,
		entity: []
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
		return this.noteService.fetchTodayNote().pipe(
			tap(note => console.log(note)),
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

		let state = ctx.getState();

		state.entity = [ event.note, ...state.entity ];

		ctx.patchState({ initialized: true });
	}

	@Action(ModifiedTodayNote)
	modifiedCollection(ctx: StateContext<TodayNoteStateModel>, event: ModifiedTodayNote) {

		let state = ctx.getState();
		let modified = event.note;

		state.entity = state.entity.map(note => { 
			if (note.noteId == modified.noteId) return modified; 
			return note;
		})

		ctx.patchState({})
	}

	@Action(RemovedTodayNote)
	removedTodayNote(ctx: StateContext<TodayNoteStateModel>, event: RemovedTodayNote) {
		let state = ctx.getState();

		state.entity = state.entity.filter( note => note.noteId != event.noteId)
		ctx.patchState({});
	}
}