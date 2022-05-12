import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface FileTemplateModel {
  name: string;
  module: string;
  user: string;
  created: string;
}

const ELEMENT_DATA: FileTemplateModel[] = [
  { name: 'Bulk Payment', module: 'Transact', user: 'John Ogbu', created: '01/04/22' },
  { name: 'Beneficiary', module: 'Transact', user: 'Teslim James', created: '01/05/22' },
  { name: 'Salary', module: 'Transact', user: 'John Ogbu', created: '01/03/22' },
  { name: 'Name', module: 'Department', user: 'Jane Doe', created: '01/02/22' },
  { name: 'User Name', module: 'Department Name', user: 'Phoebe Jane', created: '01/06/22' },
];

@Component({
  selector: 'app-list-file-templates',
  templateUrl: './list-file-templates.component.html',
  styleUrls: ['./list-file-templates.component.scss']
})
export class ListFileTemplatesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['prefix', 'name', 'module', 'user', 'created'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
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
