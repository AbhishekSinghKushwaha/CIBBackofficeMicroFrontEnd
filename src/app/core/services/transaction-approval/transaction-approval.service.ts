import { Injectable } from '@angular/core';
import urlList from '../service-list.json';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TransactionApprovalService {

  private dataSource = new BehaviorSubject<string>("service");
  public currentData = this.dataSource.asObservable();

  constructor(
    private readonly http: HttpClient
  ) { }

  accountDetails(payload: any): void {
    this.dataSource.next(payload);
    console.log(this.currentData, "currentData");
  }
  
  submitTransaction(payload: any): Observable<any> {
    return this.http.post(`${urlList.transactionApproval.submit}`,payload)
  }

  getTransactions(): Observable<any> {
    return this.http.get(`${urlList.transactionApproval.getTransactions}`)
  }

  getAccountDetails(accountNumber: string, bankId: string): Observable<any> {
    return this.http.get(`${urlList.transactionApproval.getAccountDetails + accountNumber + '/' + bankId}`)
  }
}
