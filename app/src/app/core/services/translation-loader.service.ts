import { TranslateLoader } from '@ngx-translate/core';
import {Observable, of} from 'rxjs';

import ruLang from '../../../assets/i18n/ru.json';
import enLang from '../../../assets/i18n/en.json';

export class TranslationLoaderService implements TranslateLoader
{
    getTranslation(lang: string): Observable<any> {

        switch (lang) {

          case 'en':
            return of(enLang);

          case 'ru':
              return of(ruLang);
        }

        return null;
    }

}
