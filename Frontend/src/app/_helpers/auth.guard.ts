import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // const currentUser = this.authenticationService.currentUserValue;
        const currentUser = sessionStorage.getItem('currentUser');
        const authenticatedUser = sessionStorage.getItem('authenticatedUser');
        
        if (currentUser!='null' || authenticatedUser=="SUCCESS") {
            // logged in so return true
            return true;
        }

        else{
            // logged in so return true

            
            this.router.navigate(['/login']);
            return false;
        }

        // if(this.authenticationService.isLoggedIn) {
        //     return true
        //   }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}