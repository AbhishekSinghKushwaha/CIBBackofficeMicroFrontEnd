import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import urlList from '../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class CifService {

  constructor(private http: HttpClient) { }

  // Get corporate from cif number
  getCorporateByCif(cifNumber: string): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.cif.getCorporateByCif + cifNumber
    )
  }
}
