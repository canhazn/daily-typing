import { Component } from '@angular/core';

import { AngularFireAuth }  from '@angular/fire/auth';
import { auth } 			from 'firebase';

import { Select } from '@ngxs/store';
import { AuthState } from '@store/state/auth.state';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dailytyping';
  theme = localStorage.getItem("theme") || "dark";
  @Select(AuthState.getInitialized)
  initialized$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.user.subscribe(data => {
      // console.log(data);
    })
    // this.logOut();
    // this.googleLogin();
  }


  onChanged() { 
    this.theme = this.theme == "dark" ? "candy" : "dark";    
    localStorage.setItem("theme", this.theme);
  }
  
  private googleLogin() {
    const provider = new auth.GoogleAuthProvider();    
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private logOut() {
    this.afAuth.auth.signOut()
  }
}
