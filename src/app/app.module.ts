import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Inject } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from './material';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


// Start -------------Store-------------------------
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';


import { NoteService } from '@store/service/note.service';
import { CollectionService } from '@store/service/collection.service';


import { AuthState } from '@store/state/auth.state'; 
import { ThemeState } from '@store/state/theme.state';
import { CollectionState } from '@store/state/collection.state';
import { TodayNoteState } from '@store/state/today-note.state'; 
import { ReviewState } from '@store/state/review.state';
import { CollectedState } from '@store/state/collected.state';


// End -------------Store-------------------------

// import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { EditorModule } from '@shared/editor/editor.module';
import { CollectionModule } from '@shared/collection/collection.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { tap, pairwise, startWith } from 'rxjs/operators';


const ngxs = [
   NgxsModule.forRoot([ AuthState, ThemeState ]),
   NgxsModule.forFeature([ CollectionState, TodayNoteState, ReviewState, CollectedState ]),
   NgxsReduxDevtoolsPluginModule.forRoot(),
   // NgxsLoggerPluginModule.forRoot(),
   NgxsRouterPluginModule.forRoot()
]

const angularFirebase = [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,    
    AngularFirestoreModule,
]



@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    ...angularFirebase,
    ...ngxs,
    SharedModule,
    EditorModule,
    CollectionModule,
    // BrowserAnimationsModule,
    // MaterialModule,
    AppRoutingModule,
   
  ],
  providers: [ NoteService, CollectionService ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(overlayContainer: OverlayContainer, private store: Store) {

    store.select(ThemeState.getTheme).pipe(
      startWith(null),
      pairwise(),
      tap(([pre, curr]) => {
        if (!pre) 
          overlayContainer.getContainerElement().classList.add(curr)
        else
          overlayContainer.getContainerElement().classList.replace(pre, curr)
      })
    ).subscribe()

  }
}
