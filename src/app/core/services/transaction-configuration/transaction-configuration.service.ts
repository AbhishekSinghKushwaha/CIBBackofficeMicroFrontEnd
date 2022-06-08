import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import urlList from '../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class TransactionConfigurationService {

  constructor(private http: HttpClient) { }

  postTransactionConfiguration(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transactionConfiguration.postTransactionConfiguration,
      payload
    )
  }

  getTransactionConfigurationType(typeId: any): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.transactionConfiguration.getTransactionConfigurationType + typeId
    )
  }

  getTransactionConfigurationArea(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.transactionConfiguration.getTransactionConfigurationArea
    )
  }

  getTransactionConfigurationChargeEvent(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.transactionConfiguration.getTransactionConfigurationChargeEvent
    )
  }

  getTransactionConfigurationChargeGrid(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.transactionConfiguration.getTransactionConfigurationChargeGrid
    )
  }

  getTransactionConfigurationChargeSubsidiary(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.transactionConfiguration.getTransactionConfigurationChargeSubsidiary
    )
  }

  getTransactionConfigurationChargeTranstype(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.transactionConfiguration.getTransactionConfigurationChargeTranstype
    )
  }
}
