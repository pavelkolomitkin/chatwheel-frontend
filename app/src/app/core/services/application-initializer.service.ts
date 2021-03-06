import {Injectable} from "@angular/core";
import {LocalStorageService} from "./local-storage.service";
import {Store} from "@ngrx/store";
import {State} from "../../app.state";
import {
  UserInitializationError,
  UserInitializationSuccess,
  UserTokenInitializesStore
} from "../../security/data/actions";
import {ProfileService} from "../../security/services/profile.service";
import {User} from "../../security/data/models/user.model";
import {CountryService} from "./country.service";

export function appInitializeHandler(initializer: ApplicationInitializerService)
{
  return () => {
    return initializer.initialize();
  };
}


@Injectable()
export class ApplicationInitializerService
{
  constructor(
    private localStorage: LocalStorageService,
    private profileService: ProfileService,
    private countryService: CountryService,
    private store: Store<State>
  ) {
  }

  public initialize(): Promise<void>
  {
    return new Promise<void>(async (resolve, reject) => {

      const token = this.localStorage.get(LocalStorageService.TOKEN_KEY);
      if (token === null)
      {
        resolve();
        return;
      }

      try {
        const user: User = await this.profileService.getProfile().toPromise();
        this.store.dispatch(new UserInitializationSuccess(user));
        this.store.dispatch(new UserTokenInitializesStore(token));
      }
      catch (error)
      {
        this.store.dispatch(new UserInitializationError())
      }

      resolve();
    });
  }
}
