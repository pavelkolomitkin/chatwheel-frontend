import {UploadService} from "./upload.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";

@Injectable()
export class UploadFileService extends UploadService
{
  static UPLOAD_EVENT_TYPE_PROGRESS = 'UPLOAD_EVENT_TYPE_PROGRESS';
  static UPLOAD_EVENT_TYPE_COMPLETE = 'UPLOAD_EVENT_TYPE_COMPLETE';
  static UPLOAD_EVENT_TYPE_ERROR = 'UPLOAD_EVENT_TYPE_ERROR';

  upload(file: File, url, fieldName, httpMethod = 'POST')
  {
    return new Observable((observer) => {

      const formData: FormData = new FormData();
      formData.append(fieldName, file);

      const request: HttpRequest<any> = new HttpRequest<any>(
        httpMethod,
        url,
        formData,
        {
          reportProgress: true,
          headers: new HttpHeaders({ 'enctype':  'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'})
        }
      );

      this.http.request(request).subscribe(
        (event) => {

          if (event.type === HttpEventType.UploadProgress)
          {
            const { loaded, total } = event;

            observer.next({
              loaded,
              total,
              type: UploadFileService.UPLOAD_EVENT_TYPE_PROGRESS
            });
          }
          else if (event instanceof HttpResponse)
          {
            observer.next({
              body: event.body,
              type: UploadFileService.UPLOAD_EVENT_TYPE_COMPLETE
            });
          }
        },
        (errors) => {
          observer.error({
            errors: errors.error.errors,
            type: UploadFileService.UPLOAD_EVENT_TYPE_ERROR
          });
        },
        () => {

        })
    });
  }
}
