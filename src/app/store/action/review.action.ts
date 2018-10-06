import { Note } from '@store/model/note.model';

// --- start this week -------------
export class FetchThisWeek {
	static type = '[This Weak] Fetch Note'
}

export class AddedThisWeekNote {
	static type = '[This Weak] Added Note into This Week'
	constructor(public note: Note) {}
}

export class ModifiedThisWeekNote {
	static type = '[This Weak] Modified Note in This Week'
	constructor(public note: Note) {}
}

export class RemovedThisWeekNote {
	static type = '[This Weak] Removed Note from This Week';
	constructor(public noteId: string) {}
}

// --- end this week -----------------


export class AddedThisWNote {
	static type = '[This Weak] Added Note'
	constructor(public note: Note) {}
}

export class ModifiedNote {
	static type = '[This Weak] Modified Note'
	constructor(public note: Note) {}
}

export class RemovedNote {
	static type = '[This Weak] Removed Note';
	constructor(public noteId: string) {}
}

export class UpdateNote {
	static type = '[This Weak] Update Note';
	constructor(public note: Note) {}
}