import { Injectable } from '@angular/core';
import { DoctorResponse, DoctorsResponse, Doctor } from '../models/doctor'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {API_URL} from '../../config';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public static loggedDoctorId: string;
  public static doctorOfficesId: Set<number>;

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

  public createDoctor(doctor: Doctor): Observable<any> {
    return this.httpClient
      .post(API_URL + `doctors`, doctor)
      .pipe(catchError(this._handleError))
  }

  public getAllDoctors(): Observable<DoctorsResponse> {
    return this.httpClient
    .get<DoctorsResponse>(API_URL + `doctors`)
    .pipe(catchError(this._handleError))
  }

  public getDoctorById(id: string): Observable<DoctorResponse>{
    return this.httpClient
    .get<DoctorResponse>(API_URL + `doctors/` + id)
    .pipe(catchError(this._handleError))
  }
}