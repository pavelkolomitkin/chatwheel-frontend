import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Observable, of} from "rxjs";
import {
  REMOVE_USER_AVATAR_START, RemoveUserAvatarError, RemoveUserAvatarStart,
  UPLOAD_USER_AVATAR_COMPLETE,
  UPLOAD_USER_AVATAR_START,
  UploadUserAvatarComplete,
  UploadUserAvatarError,
  UploadUserAvatarStart
} from "../actions";
import {catchError, filter, map, mergeMap, tap} from "rxjs/operators";
import {UploadFileService} from "../../services/upload/upload-file.service";
import {User} from "../../../security/data/models/user.model";
import {UserUpdated} from "../../../security/data/actions";
import {UserPictureService} from "../../services/user-picture.service";


@Injectable()
export class UploadUserPictureEffects
{
  uploadStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(UPLOAD_USER_AVATAR_START),
      mergeMap((action: UploadUserAvatarStart) => {

        const { item } = action;

        return this.userPictureService.uploadAvatar(item).pipe(
          map((user: User) => {
            this.store.dispatch(new UserUpdated(user));
            return new UploadUserAvatarComplete(item);
          }),
          catchError((error) => {
            return of(new UploadUserAvatarError(item, error.error.errors));
          })
        );
      })
    )
  });

  removeStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(REMOVE_USER_AVATAR_START),
      mergeMap((action: RemoveUserAvatarStart) => {
        return this.userPictureService.removeAvatar().pipe(
          map((user: User) => {
            return new UserUpdated(user);
          }),
          catchError((errors) => {
            return of(new RemoveUserAvatarError());
          })
        )
      })
    );
  })

  constructor(
    private actions: Actions,
    private store: Store<State>,
    private userPictureService: UserPictureService,
  ) {
  }
}
