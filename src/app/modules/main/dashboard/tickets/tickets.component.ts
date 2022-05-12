import { UpperCasePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ELEMENT_DATA } from 'src/app/core/contansts/tickets.mockdata';
import { TableCustomColumns } from 'src/app/shared/components/datatable/custom-column.component';
import { dataSource } from 'src/app/shared/components/datatable/table.datasource';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  // dataSource: any = dataSource;
  headers: any;
  translationKey: any;
  customColumns: TableCustomColumns = {
    name: {
      pipe: new UpperCasePipe()
    }
  };

  displayedColumns: string[] = [
    'subject',
    'customerName',
    'customerCIF',
    'ticketID',
    'createdBy',
    'dateCreated',
    'status',
    'action'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private router: Router) {
    this.headers = ['id', 'name'];
  }

  ngOnInit(): void {}

  action() {
    this.router.navigate(['/customer-services']);
  }
}
