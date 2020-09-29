import { Injectable } from '@angular/core';
import { AddressesResponse, AddressResponse, Address } from '../models/address'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {API_URL} from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

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

  public createAddress(address: Address): Observable<any> {
    return this.httpClient
      .post(API_URL + `address`, address)
      .pipe(catchError(this._handleError))
  }

  public getAllAddresses(): Observable<AddressesResponse> {
    return this.httpClient
    .get<AddressesResponse>(API_URL + `address`)
    .pipe(catchError(this._handleError))
  }

  public getAddressById(id: number): Observable<AddressResponse>{
    return this.httpClient
    .get<AddressResponse>(API_URL + `address/` + id)
    .pipe(catchError(this._handleError))
  }
}