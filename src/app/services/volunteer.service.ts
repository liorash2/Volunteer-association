import { Volunteer } from './../models/volunteer';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  volunteers: BehaviorSubject<Volunteer[]> = new BehaviorSubject([]);

  constructor(private apiService: ApiService) {
    //this.getVolunteers().subscribe(res => this.volunteers.next(res));
  }

  getVolunteers(): Observable<Volunteer[]> {
    return this.apiService.getVolunteers();
  }
  createVolunteers(volunteer: Volunteer): Observable<Volunteer> {
    return this.apiService.createVolunteer(volunteer).pipe(map(o => o.volunteer));
  }

  updateVolunteer(volunteer: Volunteer): Observable<boolean> {
    return this.apiService.updateVolunteer(volunteer).pipe(map(res => true),
      tap(res => {
        if (res && this.volunteers.value && this.volunteers.value.length) {
          const updatedOrgIndex = this.volunteers.value.findIndex(o => o._id === volunteer._id);
          if (updatedOrgIndex > -1) {
            this.volunteers.value[updatedOrgIndex] = volunteer;
            this.volunteers.next(this.volunteers.value);
          }
        }
      }));
  }
}
