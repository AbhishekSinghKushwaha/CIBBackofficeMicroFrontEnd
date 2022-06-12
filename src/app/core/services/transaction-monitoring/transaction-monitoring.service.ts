import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { SelectAccountNumberModalComponent } from 'src/app/shared/modals/select-account-number-modal/select-account-number-modal.component';
import { SelectCifModalComponent } from 'src/app/shared/modals/select-cif-modal/select-cif-modal.component';
import { SelectTransactionTypeModalComponent } from 'src/app/shared/modals/select-transaction-type-modal/select-transaction-type-modal.component';
import { TransactionMonitoringAmountModalComponent } from 'src/app/shared/modals/transaction-monitoring-amount-modal/transaction-monitoring-amount-modal.component';
import { environment } from 'src/environments/environment';
import urlList from '../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class TransactionMonitoringService {

  transactionAmountRef: MatDialogRef<TransactionMonitoringAmountModalComponent, any>;
  transactionCIFRef: MatDialogRef<SelectCifModalComponent, any>;
  accountNumberRef: MatDialogRef<SelectAccountNumberModalComponent, any>;
  transactionTypeRef: MatDialogRef<SelectTransactionTypeModalComponent, any>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly http: HttpClient) { }

  getTransactions(): any {
    return {
      // 'Restricted countries',
      // 'Restricted currencies',
      // 'Amount',
      // 'CIF',
      // 'Account numbers',
      'Transaction types': this.http.get(`${environment.apiUrl}${urlList.transactionMonitoring.getTransactionTypes}`),
      'Account numbers': this.http.get(`${environment.apiUrl}${urlList.transactionMonitoring.getAccountNumbers}`),
      'Company CIF': this.http.get(`${environment.apiUrl}${urlList.transactionMonitoring.getCompanyCIF}`),
      'Amount': this.http.get(`${environment.apiUrl}${urlList.transactionMonitoring.getAmount}`),
      'Restricted currencies': this.http.get(`${environment.apiUrl}${urlList.transactionMonitoring.getCurrencies}`),
      'Restricted countries': this.http.get(`${environment.apiUrl}${urlList.transactionMonitoring.getCountries}`),
    }
  }

  openAcccountNumber(data = []): MatDialogRef<SelectAccountNumberModalComponent, any> {
    this.accountNumberRef = this.dialog.open<SelectAccountNumberModalComponent, any>(
      SelectAccountNumberModalComponent,
      {
        width: '50vw',
        disableClose: true,
        data,
      }
    );
    return this.accountNumberRef;
  }

  openCIF(data = []): MatDialogRef<SelectCifModalComponent, any> {
    this.transactionCIFRef = this.dialog.open<SelectCifModalComponent, any>(
      SelectCifModalComponent,
      {
        width: '50vw',
        disableClose: true,
        data,
      }
    );
    return this.transactionCIFRef;
  }

  openAmount(action: string, payload: any[], selected: any[]): MatDialogRef<TransactionMonitoringAmountModalComponent, any> {
    this.transactionAmountRef = this.dialog.open<TransactionMonitoringAmountModalComponent, any>(
      TransactionMonitoringAmountModalComponent,
      {
        width: '60vw',
        disableClose: false,
        data: { payload, action, selected }
      }
    );
    return this.transactionAmountRef;
  }

  openTransactionTypes(data: []): MatDialogRef<SelectTransactionTypeModalComponent, any> {
    this.transactionTypeRef = this.dialog.open<SelectTransactionTypeModalComponent, any>(
      SelectTransactionTypeModalComponent,
      {
        width: '60vw',
        disableClose: false,
        data
      }
    );
    return this.transactionTypeRef;
  }

  closeAmount(data?: any) {
    this.transactionAmountRef.close(data);
  }

  closeAccountNumber(data?: any) {
    this.accountNumberRef.close(data);
  }

  closeCIF(data?: any) {
    this.transactionCIFRef.close(data);
  }

  closeTransactionType(data?: any) {
    this.transactionTypeRef.close(data);
  }

  getCompanyCIFs(searchText: any) {
    return this.http.get(
      environment.apiUrl + urlList.transactionMonitoring.searchCompanyCIFs + searchText
    )

  }

  getAccountNumbers(searchText: any) {
    // return this.http.get(
    //   environment.apiUrl + urlList.transactionMonitoring.getCompanyCIFs + searchText
    // )
    return of([{
      accountNumber: 1234567890,
      accountName: 'Mathia Ltd'
    }, {
      accountNumber: 1234567099,
      accountName: 'George Okonjo'
    }, {
      accountNumber: 1234567889,
      accountName: 'James Smart'
    }])
  }

  getTransactionTypes() {
    // return this.http.get(
    //   environment.apiUrl + urlList.transactionMonitoring.getCompanyCIFs + searchText
    // )
    return of([{
      id: 'OWN',
      name: 'Internal funds transfer'
    }, {
      id: 'IntraBank',
      name: 'Transfer to other banks in same country'
    }, {
      id: 'InterBank',
      name: 'International funds transfer'
    }, {
      id: 'MobileMoney',
      name: 'Transfer mobile money'
    }, {
      id: 'BuyAirtime"',
      name: 'Buy Airtime'
    }, {
      id: 'Subsidiary',
      name: 'Inter-country transfer within Equity subsidiaries'
    }])
  }

  saveCriteria(payload: any) {
    return this.http.post(
      environment.apiUrl + urlList.transactionMonitoring.saveCriteria, payload
    )
  }

}
