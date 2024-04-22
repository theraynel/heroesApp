import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, RouterStateSnapshot, Route, UrlSegment, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkPublicStatus(): boolean | Observable<boolean> {
     return this.authService.checkAuthntication()
       .pipe(
         tap( isAuth => {
             if ( isAuth ) {
               this.router.navigate(['./heroes/list'])
             }
         }),
         map( isAuth => !isAuth )
       );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkPublicStatus();
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkPublicStatus();
  }

}
