import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material';

import { EditorModule } from '../../shared/editor/editor.module';


import { YesterdayComponent } from './component/yesterday/yesterday.component';
import { ThisWeekComponent } from './component/this-week/this-week.component';
import { ThisMonthComponent } from './component/this-month/this-month.component';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewPageComponent } from './component/review-page.component';

import { ReviewService } from './review.service';
@NgModule({
  imports: [
    CommonModule,
    ReviewRoutingModule,    
    RouterModule,
    MaterialModule,
    EditorModule
  ],
  providers: [ ReviewService ],
  declarations: [ ReviewPageComponent, YesterdayComponent, ThisWeekComponent, ThisMonthComponent],
  // exports: [LoginPageComponent],
  // declarations: [LoginPageComponent]
})
export class ReviewModule { }