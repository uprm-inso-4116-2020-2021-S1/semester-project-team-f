import { Injectable } from '@angular/core';
import { LocationsResponse, LocationResponse, Location } from '../models/location'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {API_URL} from '../../config';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

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

  public createLocation(location: Location): Observable<any> {
    return this.httpClient
      .post(API_URL + `location`, location)
      .pipe(catchError(this._handleError))
  }

  public getAllLocations(): Observable<LocationsResponse> {
    return this.httpClient
    .get<LocationsResponse>(API_URL + `location`)
    .pipe(catchError(this._handleError))
  }

  public getLocationById(id: number): Observable<LocationResponse>{
    return this.httpClient
    .get<LocationResponse>(API_URL + `location/` + id)
    .pipe(catchError(this._handleError))
  }
}