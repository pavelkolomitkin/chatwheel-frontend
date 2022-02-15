import {Injectable} from "@angular/core";
import {UploadFileService} from "./upload/upload-file.service";
import {UploadFile} from "../data/models/upload-file.model";
import {filter, map} from "rxjs/operators";
import {User} from "../../security/data/models/user.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class UserPictureService
{
  constructor(
    private uploadFileService: UploadFileService,
    private http: HttpClient
  ) {
  }

  uploadAvatar(avatar: UploadFile)
  {
    /**
     '/core/user/avatar/upload',
     'image',
     */
    return this.uploadFileService.upload(avatar.file, '/core/user/avatar/upload', 'image')
      .pipe(
        // @ts-ignore
        filter(data => data.type === UploadFileService.UPLOAD_EVENT_TYPE_COMPLETE),
        // @ts-ignore
        map(data => User.createFromRawData(data.body))
      );
  }

  removeAvatar() : Observable<User>
  {
    return this.http.put('/core/user/avatar/remove', {}).pipe(
      map(data => User.createFromRawData(data))
    );
  }

}
