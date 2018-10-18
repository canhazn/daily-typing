import { ApplicationRef } from '@angular/core';
import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';

import { NoteService } from '@store/service/note.service';
import { Note } from '@store/model/note.model';
import { ReviewStateModel } from '@store/model/review.model';

import {
	FetchThisWeek,
	AddedThisWeekNote,
	ModifiedThisWeekNote,
	RemovedThisWeekNote,
} from '@store/action/review.action';

import { of, from } from 'rxjs';
import { take, tap, map, timeout, switchMap } from 'rxjs/operators';


@State<ReviewStateModel> ({
	name: 'review',	
	defaults: {
		thisWeek: {
			initialized: false,
			entity: []
		}
	},

})
export class ReviewState {
	constructor(private store: Store, private noteService: NoteService) {}

	@Selector()
  	static getThisWeekInitialized(state: ReviewStateModel): boolean {
    	return state.thisWeek.initialized;
  	}
	@Selector()
	static getThisWeek(state: ReviewStateModel) {
		return state.thisWeek.entity;
	}

	@Action(FetchThisWeek)
	fetchThisWeek(ctx: StateContext<ReviewStateModel>) {
		return this.noteService.fetchThisWeek().pipe(
			tap(actions => console.log(actions)),
			switchMap(actions => from(actions)),
			tap(action => {
				// console.log(action);
				if (action.type == 'added') 
				ctx.dispatch( new AddedThisWeekNote(action.payload.doc.data() as Note))
			}),
			tap(action => {
				if (action.type == 'modified') 
				ctx.dispatch(new ModifiedThisWeekNote(action.payload.doc.data() as Note))
			}),
			tap(action => {
				if (action.type == 'removed')
				ctx.dispatch(new RemovedThisWeekNote(action.payload.doc.id))
			})
		)
	}

	@Action(AddedThisWeekNote)
	addedThisWeekNote(ctx: StateContext<ReviewStateModel>, event: AddedThisWeekNote) {

		let state = ctx.getState();
	
		ctx.patchState({
			thisWeek: {
				initialized: true,
				entity: [
					...state.thisWeek.entity,
					event.note
				]
			}
		})
	}

	@Action(ModifiedThisWeekNote)
	modifiedThisWeekNote(ctx: StateContext<ReviewStateModel>, event: ModifiedThisWeekNote) {

		let modified = event.note;

		let newState = ctx.getState().thisWeek.entity.map(note => { 
			if (note.noteId == modified.noteId) return modified; 
			return note;
		})

		ctx.patchState({
			thisWeek: {
				initialized: true,
				entity: newState,				
			}
		})
	}

	@Action(RemovedThisWeekNote)
	removedThisWeekNote(ctx: StateContext<ReviewStateModel>, event: RemovedThisWeekNote) {
		let newState = ctx.getState().thisWeek.entity.filter( note => note.noteId != event.noteId)

		ctx.patchState({
			thisWeek: {
				initialized: true,
				entity: newState,				
			}
		})
	}
}