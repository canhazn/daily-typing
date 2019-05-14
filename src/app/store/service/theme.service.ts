import { Injectable } from '@angular/core';
import { Observable, of, from, BehaviorSubject, Subject } from 'rxjs';
import { take, map, tap, switchMap, catchError, filter, shareReplay, retry, skipWhile, takeWhile } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private themeLocal = localStorage.getItem("theme") || "dark"
    private _theme = new BehaviorSubject<string>(this.themeLocal);
    theme = this._theme.asObservable();

    constructor() {        
    }

    switchTheme() {
        this.theme.pipe(
            take(1),
            tap(theme => {
                let currentTheme = theme == 'light' ? 'dark' : 'light';
                this._theme.next(currentTheme);
            })
        ).subscribe()        
    }
}
