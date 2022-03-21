import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Observable, of} from "rxjs";
import {USER_INITIALIZATION_SUCCESS, USER_LOGIN_SUCCESS, UserLoginSuccess} from "../../../security/data/actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {CountryService} from "../../services/country.service";
import {Country} from "../models/country.model";
import {CountryListLoaded, CountryListLoadError} from "../actions";

@Injectable()
export class CountryEffects
{
  userInitializationSuccess: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_INITIALIZATION_SUCCESS),
      mergeMap((action: UserLoginSuccess) => {
        return this.service.getList().pipe(
          map((countries: Country[]) => {
            return new CountryListLoaded(countries);
          }),
          catchError(errors => {
            return of(new CountryListLoadError(errors));
          })
        )
      })
    )
  })

  constructor(
    private actions: Actions,
    private store: Store<State>,
    private service: CountryService
  ) {
  }
}
