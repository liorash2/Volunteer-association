import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Roles } from '../models/roles.enum';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) {
    this.getUser();
  }

  user = new BehaviorSubject<User>(null);
  private persmissions: { role: string, urls: string[] }[] = [{
    role: Roles.Admin, urls: ['/users']
  }];
  login(email: string, password: string): Observable<boolean> {
    return this.apiService.getUser(email).pipe(map(user => {
      if (user && user.customer && user.customer.password === password) {
        this.setUser(user.customer);
        this.user.next(user.customer);
        return true;
      }
      return false;
    }));
  }
  getUser() {
    try {
      const user = JSON.parse(localStorage.getItem('curentuser')) as User;
      if (user) {
        this.user.next(user);
      }
    } catch (e) { }
  }

  setUser(user: User) {
    if (user) {
      localStorage.setItem('curentuser', JSON.stringify(user));
    }
  }

  hasPermission(url: string): boolean {
    if (this.user.value) {
      let permission: { role: string, urls: string[] };
      permission = this.persmissions.find(p => p.role === this.user.value.role);
      if (permission) {
        const _url = permission.urls.find(u => u === url);
        return !!_url;
      }
    }
    return false;
  }

  logoutUser() {
    localStorage.removeItem('curentuser');
    this.user.next(null);
  }

  getUsers(): Observable<User[]> {
    return this.apiService.getUsers();

  }

  getRoles(): { name: string, key: string }[] {
    return Object.keys(Roles).map(k => {
      return { name: k, key: Roles[k] }
    });
  }
  getRoleName(role: string) {
    const roles = this.getRoles();
    if (roles && roles.length) {
      const roleObj = roles.find(r => r.key === role);
      if (roleObj) {
        return roleObj.name;
      }
      return role;
    }
  }

  updateUser(user: User): Observable<boolean> {
    return this.apiService.updateUser(user).pipe((map(u => !!u.customer)));
  }
}
