import { Note } from '@store/model/note.model';

export class FetchThisWeek {
	static type = '[This Weak] Fetch Note'
}

export class AddedNote {
	static type = '[This Weak] Added Note'
	constructor(public note: Note) {}
}

export class ModifiedNote {
	static type = '[This Weak] Modified Note'
	constructor(public note: Note) {}
}

export class RemovedNote {
	static type = '[This Weak] Removed Note';
	constructor(public collectionId: string) {}
}

export class UpdateNote {
	static type = '[This Weak] Update Note';
	constructor(public note: Note) {}
}