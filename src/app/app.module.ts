import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Inject } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

const angularFirebase = [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,    
    AngularFirestoreModule,
]

// Start -------------Store-------------------------
import { NgxsModule, Store } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
// import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { ThemeState } from '@store/state/theme.state';
// import { CollectedState } from '@store/state/collected.state';

// End -------------Store-------------------------

const ngxs = [
   NgxsModule.forRoot([ ThemeState ]),
   NgxsReduxDevtoolsPluginModule.forRoot(),
   // NgxsLoggerPluginModule.forRoot(),
   // NgxsRouterPluginModule.forRoot()
]

// import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
// import { TimeAgoPipe } from '@store/pipe/time-ago/time-ago.pipe';

// import { EditorModule } from '@shared/editor/editor.module';
// import { CollectionModule } from '@shared/collection/collection.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { tap, pairwise, startWith } from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent,
    // TimeAgoPipe,  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...angularFirebase,
    ...ngxs,
    SharedModule,
    // EditorModule,
    // CollectionModule,
    BrowserAnimationsModule,
    // MaterialModule,   
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
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
