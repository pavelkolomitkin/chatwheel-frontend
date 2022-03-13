import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {NgxPermissionsService} from 'ngx-permissions';

@Injectable()
export class AuthUserGuardService implements CanActivate {

  static ADMIN_ROLE = 'ROLE_ADMIN_USER';
  static CLIENT_ROLE = 'ROLE_CLIENT_USER';

  constructor(
      private router: Router,
      private permissionService: NgxPermissionsService
      ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getAuthChecker(route, state);
  }

  private getAuthChecker(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
      return new Promise<boolean>( async (resolve, reject) => {

        // @ts-ignore
          const url = route._routerState.url;
          const urlPrefix = this.getUrlPrefix(url);

          if (urlPrefix !== '') {

              const permissions = this.permissionService.getPermissions();
              const roles = Object.keys(permissions);
              // @ts-ignore
              if ((urlPrefix === 'admin') && (roles.includes(AuthUserGuardService.ADMIN_ROLE)))
              {
                resolve(true);
                return;
              }
              // @ts-ignore
              if (roles.includes(AuthUserGuardService.CLIENT_ROLE)) {
                resolve(true);
                return;
              }

              await this.router.navigateByUrl('/');
          }

          resolve(false);
      });
  }

  getUrlPrefix(url: string)
  {
    let result = '';

    const urlItems = url.split('/');
    if (urlItems.length > 1)
    {
      result = urlItems[1];
    }
    else
    {
      result = urlItems[0];
    }

    return result;
  }
}
