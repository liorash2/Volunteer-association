import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate {

  private persmissions: { role: string, urls: string[] }[] = [{
    role: 'admin', urls: ['users']
  }];
  constructor(private userService: UsersService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable(observe => {
      this.userService.user.subscribe(user => {
        observe.next(this.userService.hasPermission(this.getResolvedUrl(route)));
      });
    });
  }

  private getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map(v => v.url.map(segment => segment.toString()).join('/'))
      .join('/');
  }
}

@Injectable({
  providedIn: 'root'
})
export class CanActivateLogin implements CanActivate {
  constructor(private userService: UsersService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable(observe => {
      this.userService.user.subscribe(user => {
        if (!!user) {
          observe.next(this.router.parseUrl('/'));
        } else {
          observe.next(true);
        }
      });
    });
  }
}
