import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MedicalOfficeResponse, MedicalOfficesResponse } from '../models/medical_office'
import { Router } from '@angular/router';
import { throwError, Observable } from 'rxjs';
import { API_URL } from '../../config'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicalOfficeService {

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

  public getAllMedicalOffices(): Observable<MedicalOfficesResponse> {
    return this.httpClient
    .get<MedicalOfficesResponse>(API_URL + `offices`)
    .pipe(catchError(this._handleError))
  }

  public getMedicalOfficeById(id: number): Observable<MedicalOfficeResponse>{
    return this.httpClient
    .get<MedicalOfficeResponse>(API_URL + `offices/` + id)
    .pipe(catchError(this._handleError))
  }
  
}
