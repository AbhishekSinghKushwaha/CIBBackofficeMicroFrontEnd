import { Injectable } from '@angular/core';
import urlList from '../service-list.json';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TransactionApprovalService {

  constructor(
    private readonly http: HttpClient
  ) { }

  submitTransaction(payload: any) {
    return this.http.post(`${urlList.transactionApproval.submit}`,payload)
  }

  getTransactions() {
    return this.http.get(`${urlList.transactionApproval.getTransactions}`)
  }
}
