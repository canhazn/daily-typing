import { ApplicationRef } from '@angular/core';
import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';


// import {
// 	FetchTodayNote,
// 	PatchToday
// } from '@store/action/todayNote.action';
import { of, from } from 'rxjs';
import { take, tap, map, timeout, switchMap } from 'rxjs/operators';

export class FetchTodayNote {
	static type = '[Today Note] Fetch Today Note' ;
}

export class PatchTodayNote {
	static type = '[Today Note] Patch Today Note'
	constructor(public note: Note) {}
}

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
			tap(note => ctx.dispatch(new PatchTodayNote(note)))
		)
	}

	@Action(PatchTodayNote)
	patchTodayNote(ctx: StateContext<TodayNoteStateModel>, event: PatchTodayNote) {
		ctx.patchState({
			initialized: true,
			entity: event.note
		});
	}
}