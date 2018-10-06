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
	static getCollection(state: CollectionStateModel) {
		return state.entity;
	}

	@Action(FetchCollection)
	fetchCollection(ctx: StateContext<CollectionStateModel>) {
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
	patchCollection(ctx: StateContext<CollectionStateModel>, event: AddedCollection) {
		let state = ctx.getState();
	
		ctx.patchState({ entity: [
			...state.entity,
			event.collection
		]})

		ctx.patchState({ initialized: true });
	}

	@Action(ModifiedCollection)
	updateCollection(ctx: StateContext<CollectionStateModel>, event: ModifiedCollection) {

		let modified = event.collection;

		let newState = ctx.getState().entity.map(collection => { 
			if (collection.collectionId == modified.collectionId) return modified; 
			return collection;
		})

		ctx.patchState({
			entity: newState
		})
	}

	@Action(RemovedCollection)
	removeCollection(ctx: StateContext<CollectionStateModel>, event: RemovedCollection) {
		let newState = ctx.getState().entity.filter( collection => collection.collectionId != event.collectionId)

		ctx.patchState({
			entity: newState
		})
	}
}