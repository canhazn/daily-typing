import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Store } from '@ngxs/store';
import { ThemeState } from '@store/state/theme.state';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Select(ThemeState.getTheme)  theme: Observable<string>;
  
  constructor(private store: Store) {
  }

}
