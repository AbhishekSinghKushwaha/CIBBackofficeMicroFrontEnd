import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileTemplateService } from 'src/app/core/services/file-template/file-template.service';

export interface TemplateModel {
  name: string;
  required: string;
  type: string;
  businessRule: string;
}

const ELEMENT_DATA: TemplateModel[] = [
  {
    name: 'Payment Date',
    required: 'R',
    type: 'D',
    businessRule: 'The value date of the transaction must be current or in future'
  }
];

const OTHER_DATA: TemplateModel[] = [
  {
    name: 'Beneficiary',
    required: 'R',
    type: 'D',
    businessRule: 'The value date of the transaction must be current or in future'
  },
  {
    name: 'Transact',
    required: 'R',
    type: 'D',
    businessRule: 'The value date of the transaction must be current or in future'
  },
  {
    name: 'Bulk payment',
    required: 'R',
    type: 'D',
    businessRule: 'The value date of the transaction must be current or in future'
  },
  {
    name: 'Salary',
    required: 'R',
    type: 'D',
    businessRule: 'The value date of the transaction must be current or in future'
  },
  {
    name: 'Name',
    required: 'R',
    type: 'D',
    businessRule: 'The value date of the transaction must be current or in future'
  }
];


@Component({
  selector: 'app-configure-file-templates-modal',
  templateUrl: './configure-file-templates-modal.component.html',
  styleUrls: ['./configure-file-templates-modal.component.scss']
})
export class ConfigureFileTemplatesModalComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'required', 'type', 'businessRule', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<TemplateModel>(true, []);

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private readonly fileTemplateService: FileTemplateService,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.data === 'edit') {
      this.displayedColumns.unshift('select');
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  addColumn() {
    ELEMENT_DATA.push(OTHER_DATA[Math.floor(Math.random() * 5)]);
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  submit() {
    this.fileTemplateService.closeTemplateBuilder(ELEMENT_DATA);
  }

}
