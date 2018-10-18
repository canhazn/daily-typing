import { ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

import { AuthState } from '@store/state/auth.state';
import { CollectedState } from '@store/state/collected.state';

import { CollectionService } from '@store/service/collection.service';

import {
	FetchCollection,
	AddedCollection,
	RemovedCollection,
	UpdateCollection,
	ModifiedCollection,
} from '@store/action/collection.action';

import { CollectionStateModel, Collection } from '../model/collection.model';
import { of, from } from 'rxjs';
import { take, tap, map, timeout, switchMap } from 'rxjs/operators';


@State<CollectionStateModel> ({
	name: 'collection',	
	defaults: {
		initialized: false,
		entity: []
	},
	// children: [CollectedState]
})
export class CollectionState {
	constructor(private store: Store, private afs: AngularFirestore, private collectionService: CollectionService) {}

	@Selector()
  	static getInitialized(state: CollectionStateModel): boolean {
    	return state.initialized;
  	}
	@Selector()
	static getCollection(state: CollectionStateModel, store: Store) {
		return state.entity;
	}
	// sort by createdAt property
	private sortArrayCollection(a : Collection, b : Collection) { return a.createdAt.seconds - b.createdAt.seconds }

	@Action(FetchCollection)
	fetchCollection(ctx: StateContext<CollectionStateModel>) {
		ctx.patchState({ initialized: true });
		return this.collectionService.fetchCollection().pipe(			
			// tap(actions => console.log(actions)),
			switchMap(actions => from(actions)),
			tap(action => {
				if (action.type == 'added') 
				ctx.dispatch( new AddedCollection(action.payload.doc.data() as Collection))
			}),
			tap(action => {
				if (action.type == 'modified') 
				ctx.dispatch(new ModifiedCollection(action.payload.doc.data() as Collection))
			}),
			tap(action => {
				if (action.type == 'removed')
				ctx.dispatch(new RemovedCollection(action.payload.doc.id))
			})
		)
	}


	@Action(AddedCollection)
	addedCollection(ctx: StateContext<CollectionStateModel>, event: AddedCollection) {
		let state = ctx.getState();
		state.entity = [ event.collection, ...state.entity ];
		// console.log(state.entity);

		// ctx.patchState({ entity: [
		// 	...state.entity,
		// 	event.collection
		// ]})

		ctx.patchState({});
	}

	@Action(ModifiedCollection)
	modifiedCollection(ctx: StateContext<CollectionStateModel>, event: ModifiedCollection) {

		let state = ctx.getState();
		let modified = event.collection;

		state.entity = state.entity
			.map(collection => { 
				if (collection.collectionId == modified.collectionId) return modified; 
				return collection;
			})
		ctx.patchState({});		
	}

	@Action(RemovedCollection)
	removedCollection(ctx: StateContext<CollectionStateModel>, event: RemovedCollection) {
		let state = ctx.getState();

		state.entity = state.entity.filter( collection => collection.collectionId != event.collectionId)
		ctx.patchState({});
	}
}