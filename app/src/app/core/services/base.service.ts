import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export abstract class BaseService
{
    constructor(protected http: HttpClient) {}

    getHttpParamsFromObject(params: Object)
    {
        let result: HttpParams = new HttpParams();

        for (let [name, value] of Object.entries(params))
        {
            if ((typeof value !== 'undefined') && (value !== null))
            {
                result = result.append(name, value.toString());
            }
        }

        return result;
    }
}