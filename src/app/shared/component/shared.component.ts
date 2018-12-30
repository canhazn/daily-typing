import { NgModule } from '@angular/core';
import { SharedModule }      from '@shared/shared.module';

import { EditorModule } from './editor/editor.module';
import { CollectionModule } from './collection/collection.module';
import { EditCollectionBtnModule } from './edit-collection-btn/edit-collection-btn.module';

import { AddNoteBtnComponent } from './add-note-btn/add-note-btn.component';

@NgModule({
	declarations: [ 				
		AddNoteBtnComponent, //home.comonent, collected.component
	],
	imports: [
		SharedModule,
		EditorModule,
		CollectionModule,
		EditCollectionBtnModule,
	],
	exports: [
		EditorModule,
		CollectionModule,
		EditCollectionBtnModule,
		AddNoteBtnComponent
	]
})
export class SharedComponent { }