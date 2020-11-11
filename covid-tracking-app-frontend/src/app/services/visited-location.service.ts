import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {API_URL} from '../../config';
import { VisitedLocation, VisitedLocationResponse, VisitedLocationsResponse } from '../models/visited_location'
import { LocationsResponse } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class VisitedLocationService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  public _handleError(error: HttpErrorResponse | any) {
    let data = {};
    data = {
      reason: error && error.error.reason ? error.error.reason : '',
      status: error.status

    };
    console.error(data);
    return throwError(error);
  }

  public createVisitedLocation(location: VisitedLocation): Observable<any> {
    return this.httpClient
      .post(API_URL + `visited-locations`, location)
      .pipe(catchError(this._handleError))
  }

  public getLocationsVisitedByUserId(uid: string): Observable<VisitedLocationsResponse> {
    return this.httpClient
    .get<VisitedLocationsResponse>(API_URL + `users/${uid}/visited-locations`)
    .pipe(catchError(this._handleError))
  }

  public getAllVisitedLocations(): Observable<VisitedLocationsResponse>{
    return this.httpClient
    .get<VisitedLocationsResponse>(API_URL + `visited-locations/`)
    .pipe(catchError(this._handleError))
  }
}
