import { Collected } from '../model/collected.model';

export interface PatchData {
	collectionId: string,
	arrayCollected: Collected[]
}

export class FetchCollected {
	static type = '[Collected] Fetch Collected'
	constructor(public collectionId: string) {}
}

export class PatchCollected {
	static type = '[Collected] Patch Collected'
	constructor(public patchData: PatchData) {}
}


export class CreateCollected {
	static type = '[Collected] Create Collected';
	constructor(public collected: Collected) {}
}

export class UpdateCollected {
	static type = '[Collected] Update Collected';
	constructor(public collected: Collected) {}
}