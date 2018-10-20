import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { TopNavComponent } from './top-nav/top-nav.component';

// import { CollectionModule } from './collection/collection.module';
// import { EditorModule } from './editor/editor.module';


@NgModule({
  imports: [
    CommonModule, 
    // BrowserAnimationsModule, 
    RouterModule,
    MaterialModule, 
    FormsModule,   
  ],
	declarations: [ TopNavComponent ],
	exports: [TopNavComponent]
})
export class SharedModule { }