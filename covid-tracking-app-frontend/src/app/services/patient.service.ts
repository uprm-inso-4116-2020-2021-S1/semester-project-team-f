import { Injectable } from '@angular/core';
import { PatientResponse, PatientsResponse, Patient } from '../models/patient'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {API_URL} from '../../config';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

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

  public createPatient(patient: Patient): Observable<any> {
    return this.httpClient
      .post(API_URL + `patients`, patient)
      .pipe(catchError(this._handleError))
  }

  public deletePatient(oid: number, uid: string): Observable<any> {
    return this.httpClient
      .delete(API_URL + 'offices/' + oid +'/patients/' + uid)
      .pipe(catchError(this._handleError))
  }

  public getAllPatients(): Observable<PatientsResponse> {
    return this.httpClient
    .get<PatientsResponse>(API_URL + `patients`)
    .pipe(catchError(this._handleError))
  }

  public getPatientsByOfficeId(id: number): Observable<PatientsResponse>{
    return this.httpClient
    .get<PatientsResponse>(API_URL + `offices/${id}/patients`)
    .pipe(catchError(this._handleError))
  }

  public getPatientUserIdAndOffice(oid: number, uid: string): Observable<PatientsResponse>{
    return this.httpClient
    .get<PatientsResponse>(API_URL + 'offices/' + oid +'/patients/' + uid)
    .pipe(catchError(this._handleError))
  }
}