import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {NgxPermissionsService} from 'ngx-permissions';


@Injectable()
export class DefaultRedirectGuard implements CanActivate
{
    roleDefaultRouteMap = {
        'ROLE_ADMIN_USER': '/admin',
        'ROLE_CLIENT_USER': '/chatwheel'
    };

    constructor(private router: Router, private permissionService: NgxPermissionsService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return new Promise((resolve, reject) => {

            const permissions = this.permissionService.getPermissions();

            let isRedirected = false;
            for (let role in this.roleDefaultRouteMap)
            {
                if (!!permissions[role])
                {
                    isRedirected = true;
                    const route = this.roleDefaultRouteMap[role];
                    this.router.navigateByUrl(route);
                    break;
                }
            }

            if (!isRedirected)
            {
              this.router.navigateByUrl('/security/login');
            }

            resolve(true);
        });
    }

}
