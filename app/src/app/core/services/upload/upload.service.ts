import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export abstract class UploadService
{
  constructor(protected http: HttpClient) { }
}
