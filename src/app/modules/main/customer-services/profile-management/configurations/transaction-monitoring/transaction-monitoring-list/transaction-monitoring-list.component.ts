import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { MonitoringListModel } from 'src/app/core/domain/transaction-monitoring.model';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { TransactionMonitoringService } from 'src/app/core/services/transaction-monitoring/transaction-monitoring.service';
import { StorageService } from 'src/app/core/services/utils/storage.service';

@Component({
  selector: 'app-transaction-monitoring-list',
  templateUrl: './transaction-monitoring-list.component.html',
  styleUrls: ['./transaction-monitoring-list.component.scss']
})
export class TransactionMonitoringListComponent implements OnInit {
  displayedColumns: string[] = [];
  commonDisplayedColumns: string[] = ['user', 'dateCreated'];
  data: MonitoringListModel;
  dataSource = new MatTableDataSource<MonitoringListModel>();
  @ViewChild(MatSort) sort: MatSort;
  criteria: string;
  options = [
    'Restricted countries',
    'Restricted currencies',
    'Amount',
    'Company CIF',
    'Account numbers',
    'Transaction types'
  ];
  countries: any[] = []

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private dataLookUpService: DataLookupService,
    private readonly transactionMonitoringService: TransactionMonitoringService,
    private readonly storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.getCountries()
  }


  getCountries() {
    this.dataLookUpService
      .getCountries()
      .subscribe((response: any) => {
        response.status && this.storageService.setData('countries', response.data);
        this.countries = response.data;
      });
  }

  flagPath(code: string) {
    return this.countries?.find(x =>  x.countryCode === code  || x.currency === code).flagPath;
  }

  findCountry(code: string){
    return this.countries.find(x=>x.countryCode === code).countryName 
  }

  getData() {
    this.dataSource.data = [];
    this.transactionMonitoringService
      .getTransactions()[this.criteria]
      .subscribe((response: any) => {
        this.dataSource.data = response?.data?.items;
      })
  }

  onSearch(data: any) {
    // options = [
    //   'Restricted countries',
    //   'Restricted currencies',
    //   'Amount',
    //   'CIF',
    //   'Account numbers',
    //   'Transaction types'
    // ];
    
    this.criteria = data.value;
    if (this.criteria === this.options[5]) {
      this.displayedColumns = ['transactionType', ...this.commonDisplayedColumns];
    } else if (this.criteria === this.options[4]) {
      this.displayedColumns = ['accountNumber', ...this.commonDisplayedColumns];
    } else if (this.criteria === this.options[3]) {
      this.displayedColumns = ['companyCIF', ...this.commonDisplayedColumns];
    } else if (this.criteria === this.options[2]) {
      this.displayedColumns = ['flag', 'amount', 'currencyCode', ...this.commonDisplayedColumns];
    } else if (this.criteria === this.options[1]) {
      this.displayedColumns = ['flag', 'currencyCode', ...this.commonDisplayedColumns];
    } else if (this.criteria === this.options[0]) {
      this.displayedColumns = ['flag', 'country', ...this.commonDisplayedColumns];
    }
    if (this.criteria) {
      this.getData();
    }

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
