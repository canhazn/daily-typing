import { Note } from '@store/model/note.model';


export class FetchTodayNote {
	static type = '[Today Note] Fetch Today Note' ;
}

export class AddedTodayNote {
	static type = '[This Weak] Added Today Note'
	constructor(public note: Note) {}
}

export class ModifiedTodayNote {
	static type = '[This Weak] Modified Today Note'
	constructor(public note: Note) {}
}

export class RemovedTodayNote {
	static type = '[This Weak] Removed Today Note';
	constructor(public noteId: string) {}
}