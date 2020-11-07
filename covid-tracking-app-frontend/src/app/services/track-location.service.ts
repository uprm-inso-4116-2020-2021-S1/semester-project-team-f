import { Injectable } from '@angular/core';
import { LocationsResponse, LocationResponse, Location } from '../models/location'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { API_URL } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class TrackLocationService {

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

  public createVisitedLocation(location: Location): Observable<any> {
    return this.httpClient
      .post(API_URL + `Visited location`, location)
      .pipe(catchError(this._handleError))
  }

  public getAllVisitedLocations(): Observable<LocationsResponse> {
    return this.httpClient
    .get<LocationsResponse>(API_URL + `Visited location`)
    .pipe(catchError(this._handleError))
  }

  public deleteVisitedLocation(location: Location): Observable<any> {
    return this.httpClient
      .delete(API_URL + `Visited Location`)
      .pipe(catchError(this._handleError))
  }
}