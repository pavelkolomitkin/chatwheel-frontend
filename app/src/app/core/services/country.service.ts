import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Country} from "../data/models/country.model";

@Injectable()
export class CountryService
{
  constructor(private http: HttpClient) { }

  getList()
  {
    return this.http.get<{ list: Country[] }>('/core/country/list').pipe(
      map(({ list }) => list),
    )
  }
}
