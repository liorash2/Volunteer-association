import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Organization } from '../models/organization';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrgnizationService {

  organizations: BehaviorSubject<Organization[]> = new BehaviorSubject([]);

  constructor(private apiService: ApiService) {
    this.getOrganizations().subscribe(res => this.organizations.next(res));
  }

  getOrganizations(): Observable<Organization[]> {
    return this.apiService.getOrganizations();
  }
  createOrganization(organization: Organization): Observable<Organization> {
    return this.apiService.createOrganization(organization).pipe(map(o => o.organization));
  }

  updateOrganization(organization: Organization): Observable<boolean> {
    return this.apiService.updateOrganization(organization).pipe(map(res => true),
      tap(res => {
        if (res && this.organizations.value && this.organizations.value.length) {
          const updatedOrgIndex = this.organizations.value.findIndex(o => o._id === organization._id);
          if (updatedOrgIndex > -1) {
            this.organizations.value[updatedOrgIndex] = organization;
            this.organizations.next(this.organizations.value);
          }
        }
      }));
  }
}
