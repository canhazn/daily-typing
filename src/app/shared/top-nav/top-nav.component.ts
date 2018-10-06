import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Store, Select }        from '@ngxs/store';

import { Observable }   from 'rxjs';

import { Logout } from '@store/action/auth.action';
import { AuthState } from '@store/state/auth.state';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

	@Output() changedTheme = new EventEmitter<string>();
  @Select(AuthState.getUser) user : Observable<any>;
  
  constructor(private store: Store) {}

  changeTheme(): void {
  	this.changedTheme.emit();  	
  }

  ngOnInit() {    
    // this.store.subscribe(data => console.log(data))
  }

  logout() {   
    this.store.dispatch( new Logout());   
  }

}
