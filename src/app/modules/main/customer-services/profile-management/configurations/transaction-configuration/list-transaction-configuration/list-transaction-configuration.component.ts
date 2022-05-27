import { TransactionConfigurationService } from './../../../../../../../core/services/transaction-configuration/transaction-configuration.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment'; let ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-list-transaction-configuration',
  templateUrl: './list-transaction-configuration.component.html',
  styleUrls: ['./list-transaction-configuration.component.scss']
})
export class ListTransactionConfigurationComponent implements OnInit {
  displayedColumns: string[] = ['type', 'user', 'date'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private transactionConfService: TransactionConfigurationService) { }

  ngOnInit(): void {
    this.getTransactions()
  }

  getTransactions() {
    this.transactionConfService.getTransactionConfigurationChargeGrid()
      .subscribe((res: any) => {
        if (res.isSuccessful) {
          ELEMENT_DATA = []
          for (const item of res.data) {

            ELEMENT_DATA.push({ type: item.type, user: 'unset', date: moment(item.creationDate).toString() })
          }
          console.log(ELEMENT_DATA)
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        }
      })
  }

}
