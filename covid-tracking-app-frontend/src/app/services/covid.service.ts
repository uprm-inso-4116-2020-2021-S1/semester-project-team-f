import { Injectable } from '@angular/core';
import { CovidCaseResponse, CovidCasesResponse, CovidCase } from '../models/covid_case'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {API_URL} from '../../config';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

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

  public createRecord(covid_Case: CovidCase): Observable<any> {
    return this.httpClient
      .post(API_URL + `covid_cases`, covid_Case)
      .pipe(catchError(this._handleError))
  }

  public deleteRecord(covid_Case: CovidCase): Observable<any> {
    return this.httpClient
      .delete(API_URL + `covid_cases/` + covid_Case.patient_id + '&' + covid_Case.office_id + '&' + covid_Case.date_tested)
      .pipe(catchError(this._handleError))
  }

  public getAllCases(): Observable<CovidCasesResponse> {
    return this.httpClient
    .get<CovidCasesResponse>(API_URL + `covid_cases`)
    .pipe(catchError(this._handleError))
  }

  public getCovidCasesByOfficeId(id: number): Observable<CovidCasesResponse>{
    return this.httpClient
    .get<CovidCasesResponse>(API_URL + `covid_cases/` + id)
    .pipe(catchError(this._handleError))
  }
}