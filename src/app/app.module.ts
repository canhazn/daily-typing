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


import { AppComponent } from './app.component';
import { TopNavComponent } from '@shared/top-nav/top-nav.component';
const component = [
  AppComponent,
  TopNavComponent
]
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeService } from '@store/service/theme.service';
import { tap, pairwise, startWith } from 'rxjs/operators';

@NgModule({
  declarations: [
    ...component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...angularFirebase,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer, private themeService: ThemeService) {

    themeService.theme.pipe(
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
