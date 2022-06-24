import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private readonly http: HttpClient) { }

  public getCoupons(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/coupons`).toPromise();
  }
}
