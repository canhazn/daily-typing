import { Component } from '@angular/core';
import { ThemeService } from '@store/service/theme.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  showLoadding = true;
  theme: Observable<string> = this.themeService.theme;
  
  constructor(private themeService: ThemeService) {    
  }



}
