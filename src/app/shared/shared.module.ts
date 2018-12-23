import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material';
import { TopNavComponent } from './top-nav/top-nav.component';
import { LoadingSpinerComponent } from './loading-spinner/loading-spinner.component';
import { TimeAgoPipe } from './pipe/time-ago.pipe';

@NgModule({
	declarations: [ 
		TopNavComponent,  // app.component.html
		LoadingSpinerComponent, // app.component.html
		TimeAgoPipe // editer.componet.html
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
		TimeAgoPipe, 
		MaterialModule, 
	]
})
export class SharedModule { }