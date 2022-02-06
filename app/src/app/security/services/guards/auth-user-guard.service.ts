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

  static routePermissionRules: { [s: string]: Array<string> } = {
      admin: [ 'ROLE_ADMIN_USER' ],
      client: [ 'ROLE_CLIENT_USER' ]
  };

  constructor(
      private router: Router,
      private permissionService: NgxPermissionsService
      ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.getAuthChecker(route);
  }

  private getAuthChecker(route: ActivatedRouteSnapshot)
  {
      return new Promise<boolean>((resolve, reject) => {

        //debugger
          let result: boolean = false;

          if (route.url.length > 0) {
              const urlPrefix = route.url[0].toString();
              const routeRoles = AuthUserGuardService.routePermissionRules[urlPrefix];

              const permissions = this.permissionService.getPermissions();
              for (let role in permissions) {
                  result = routeRoles.includes(role);
                  if (result) {
                      break;
                  }
              }
          }

          if (!result)
          {
              this.router.navigate(['/']);
          }

          resolve(result);
      });
  }
}
