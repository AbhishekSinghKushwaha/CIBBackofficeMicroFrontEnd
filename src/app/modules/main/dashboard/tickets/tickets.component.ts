import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableCustomColumns } from 'src/app/shared/components/datatable/custom-column.component';
import { dataSource } from 'src/app/shared/components/datatable/table.datasource';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  dataSource: any = dataSource;
  headers: any;
  translationKey: any;
  customColumns: TableCustomColumns = {
    name: {
      pipe: new UpperCasePipe()
    }
  };

  constructor() {
    this.headers = ['id', 'name'];
  }

  ngOnInit(): void {}
}
