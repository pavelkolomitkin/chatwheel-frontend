import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType, ROOT_EFFECTS_INIT} from "@ngrx/effects";
import {tap} from "rxjs/operators";
import {GlobalStoreEffectInit} from "../actions";
import {State} from "../../../app.state";

@Injectable()
export class AppInitEffect
{
  // ngrxOnInitEffects(): Action {
  //   debugger
  //   return new GlobalStoreEffectInit();
  // }
  rootEffectsInit: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(ROOT_EFFECTS_INIT),
      tap(() => {
       this.store.dispatch(new GlobalStoreEffectInit());
      })
    )
  }, { dispatch: false });

  constructor(
    private actions: Actions,
    private store: Store<State>,
  ) {
  }
}
