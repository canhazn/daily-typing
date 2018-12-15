import { Action, Selector, State, StateContext, Store, NgxsOnInit } from '@ngxs/store';
import { of, from } from 'rxjs';
import { take, tap, map, timeout, switchMap } from 'rxjs/operators';

export interface ThemeStateModel {
	theme: string,
}

export class ChangedTheme {
	static readonly type = "[ Theme ] Changed theme" ;	
}

@State<ThemeStateModel> ({
	name: 'appTheme',	
	defaults: {
		theme: localStorage.getItem("theme") || "dark"
	}
})
export class ThemeState {

	@Selector()
	static getTheme(state: ThemeStateModel) {
		return state.theme
	}

	@Action(ChangedTheme)
	changedTheme(ctx: StateContext<ThemeStateModel>) {

		let state = ctx.getState();
		state.theme = state.theme == "dark" ? "light" : "dark";    

		ctx.patchState({});
		localStorage.setItem("theme", state.theme);
	}
}