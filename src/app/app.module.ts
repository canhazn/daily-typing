import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Inject } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from './material';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';


// Start -------------Store-------------------------
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';


import { NoteService } from '@store/service/note.service';
import { CollectionService } from '@store/service/collection.service';


import { AuthState } from '@store/state/auth.state'; 
import { CollectionState } from '@store/state/collection.state';
import { TodayNoteState } from '@store/state/today-note.state'; 
import { ReviewState } from '@store/state/review.state';
// import { CollectedState } from '@store/state/collected.state';


// End -------------Store-------------------------

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { EditorModule } from '@shared/editor/editor.module';
import { CollectionModule } from '@shared/collection/collection.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as authActions from './core/auth/auth.actions';
import { User } from './core/auth/user.model';
import { filter, take, tap, skip } from 'rxjs/operators';


const ngxs = [
   NgxsModule.forRoot([ AuthState ]),
   NgxsModule.forFeature([ CollectionState, TodayNoteState, ReviewState ]),
   NgxsReduxDevtoolsPluginModule.forRoot(),
   NgxsLoggerPluginModule.forRoot(),
   NgxsRouterPluginModule.forRoot()
]

const angularFirebase = [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,    
    AngularFirestoreModule,
]



@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ...angularFirebase,
    CoreModule,
    EditorModule,
    CollectionModule,
    // BrowserAnimationsModule,
    // MaterialModule,
    SharedModule,
    ...ngxs,
    AppRoutingModule,
   
  ],
  providers: [ NoteService, CollectionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
