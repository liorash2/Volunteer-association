import { Organization } from 'src/app/models/organization';
import { Volunteer } from './../models/volunteer';
import { Hobby } from './../models/Hobby';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { Region } from '../models/Region';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private readonly API_URL = 'https://volunteer-api-node.herokuapp.com/api/v1/'//'http://localhost:3000/api/v1/';

  getUser(email: string): Observable<{ customer: User }> {
    return this.http.get<{ customer: User }>(this.API_URL + 'customer/' + email);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + 'customer');
  }

  updateUser(user: User): Observable<{ customer: User }> {
    return this.http.put<{ customer: User }>(this.API_URL + 'customer/' + user._id, user);
  }

  getOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.API_URL + 'organization');
  }

  createOrganization(organization: Organization): Observable<{ organization: Organization }> {
    return this.http.post<{ organization: Organization }>(this.API_URL + 'organization', organization);
  }
  updateOrganization(organization: Organization): Observable<void> {
    return this.http.put<void>(this.API_URL + 'organization/' + organization._id, organization);
  }
  getHobbies(): Observable<Hobby[]> {
    return this.http.get<Hobby[]>(this.API_URL + 'hobbies');
  }
  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.API_URL + 'regions');
  }
  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.API_URL + 'volunteer');
  }

  createVolunteer(volunteer: Volunteer): Observable<{ volunteer: Volunteer }> {
    return this.http.post<{ volunteer: Volunteer }>(this.API_URL + 'volunteer', volunteer);
  }
  updateVolunteer(volunteer: Volunteer): Observable<void> {
    return this.http.put<void>(this.API_URL + 'volunteer/' + volunteer._id, volunteer);
  }
  getOpenOrganization(volunteer: Volunteer): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.API_URL + 'volunteer/organizations/' + volunteer.email);
  }
  getFreeVolunteers(org: Organization): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(this.API_URL + 'organization/volunteers/' + org._id);
  }
  registerVolunteerToOrganization(volunteer: Volunteer, orgid: string): Observable<boolean> {
    return this.http.put<boolean>(this.API_URL + 'volunteer/register/' + volunteer.email + '/' + orgid, null);
  }
  
}
