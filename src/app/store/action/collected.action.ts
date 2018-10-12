import { Note } from '@store/model/note.model';
import { Observable } from 'rxjs';

export interface PatchData {
	collectionId: string,
	array: Note[]
}

export class FetchCollected {
	static type = '[Collected] Fetch Collected'
	constructor(public collectionId: string) {}
}

export class PatchCollected {
	static type = '[Collected] Patch Note Collected'
	constructor(public arrayObservableNote: Observable<Note>[], public collectionId: string) {}
}

export class AddedNote {
	static type = '[Collected] Added Collected Note'
	constructor(public note: Note, public collectionId: string) {}
}

export class ModifiedNote {
	static type = '[Collected] Modified Collected Note'
	constructor(public note: Note, public collectionId: string) {}
}

export class RemovedNote {
	static type = '[Collected] Removed Collected Note';
	constructor(public note: Note, public collectionId: string) {}
}

export class ResetCollected {
	static type = '[Collected] Reset/create array note';
	constructor(public collectionId: string) {}
}