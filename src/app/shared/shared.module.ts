import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material';
import { TopNavComponent } from './top-nav/top-nav.component';
import { LoadingSpinerComponent } from './loading-spinner/loading-spinner.component';
import { TimeAgoPipe } from './pipe/time-ago.pipe';

// Please consider moving AddNoteBtnComponent to a higher module
import { AddNoteBtnComponent } from '@shared/add-note-btn/add-note-btn.component';

@NgModule({
	declarations: [ 
		TopNavComponent,  // app.component.html
		LoadingSpinerComponent, // app.component.html
		TimeAgoPipe, // editer.componet.html
		AddNoteBtnComponent, //home.comonent, collected.component
	],

	imports: [
		CommonModule, 
		RouterModule,		
		FormsModule,  
		MaterialModule, // every conponent need it
	],
	exports: [
		TopNavComponent, 
		LoadingSpinerComponent,
		AddNoteBtnComponent, 
		TimeAgoPipe, 
		MaterialModule, 
		FormsModule
	]
})
export class SharedModule { }