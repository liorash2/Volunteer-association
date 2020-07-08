import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Organization } from '../models/organization';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrgnizationService {

  constructor(private apiService: ApiService) { }

  getOrganizations(): Observable<Organization[]> {
    return this.apiService.getOrganizations();
  }
  createOrganization(organization: Organization): Observable<Organization> {
    return this.apiService.createOrganization(organization).pipe(map(o => o.organization));
  }
}
