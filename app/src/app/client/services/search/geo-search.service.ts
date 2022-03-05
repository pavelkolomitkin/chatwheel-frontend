import {BaseService} from "../../../core/services/base.service";
import {Injectable} from "@angular/core";
import {MapViewBox} from "../../../shared/data/model/map-view-box.model";
import {map} from "rxjs/operators";
import {User} from "../../../security/data/models/user.model";

@Injectable()
export class GeoSearchService extends BaseService
{
  getUsersWithInBox(box: MapViewBox)
  {
    return this.http.post<{ users: User[] }>('/client/search/geo/box', {
      box: box
    })
      .pipe(
        map(({ users }) => {
          const result = [];

          for (let userData of users)
          {
            result.push(
              User.createFromRawData(userData)
            );
          }

          return result;
        })
      );
  }

  getUsersNearBy(page: number = 1)
  {
    const params = this.getHttpParamsFromObject({ page })

    return this.http.get<{ users: User[] }>('client/search/geo', { params })
      .pipe(
        map(({ users }) => {
          const result = [];

          for (let userData of users)
          {
            result.push(
              User.createFromRawData(userData)
            );
          }

          return result;
        })
      );
  }
}
