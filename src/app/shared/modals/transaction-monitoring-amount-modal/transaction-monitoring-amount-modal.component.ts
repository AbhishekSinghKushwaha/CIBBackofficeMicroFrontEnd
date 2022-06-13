import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionMonitoringService } from 'src/app/core/services/transaction-monitoring/transaction-monitoring.service';


@Component({
  selector: 'app-transaction-monitoring-amount-modal',
  templateUrl: './transaction-monitoring-amount-modal.component.html',
  styleUrls: ['./transaction-monitoring-amount-modal.component.scss']
})
export class TransactionMonitoringAmountModalComponent implements OnInit {
  displayedColumns: string[] = ['currency', 'amount', 'action'];
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<any>(true, []);

  formData: FormGroup = new FormGroup({});
  dataSource = new MatTableDataSource<any>([]);

  allData: any[];

  constructor(private _liveAnnouncer: LiveAnnouncer,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly transactionMonitoringService: TransactionMonitoringService) { }

  ngOnInit(): void {
    console.log({ data: this.data })
    this.initiateForm();
    console.log(this.data)
    if (this.data?.payload?.length) {
      for (let i = 0; i < this.data.payload.length; i++) {
        this.formDataArray.push(
          this.createFormGroup(this.data.payload[i])
        );
      }
      this.formDataArray.updateValueAndValidity();
      this.setdataTable();
      for (const selection of this.data.selected) {
        this.selection.select(selection);
      }
    } else {
      this.addNewLine()
    }
  }

  setdataTable() {
    console.log(this.formDataArray.controls);
    this.dataSource.data = this.formDataArray.controls;
    this.dataSource.sortingDataAccessor = (data: AbstractControl, sortHeaderId: string) => {
      const value: any = data.value[sortHeaderId];
      return typeof value === "string" ? value.toLowerCase() : value;
    };

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    }
  }

  get formDataArray() {
    return this.formData.get('formArray') as FormArray;
  }

  initiateForm() {
    this.formData = this.fb.group({
      formArray: this.fb.array([])
    });
  }

  createFormGroup(data: any) {
    console.log(this.formDataArray.controls);

    for (const control of this.formDataArray.controls) {
      control.valid && control.patchValue({ edit: false })
    }

    return this.fb.group({
      currency: [data.currency, Validators.required],
      amount: [data.amount, Validators.required],
      edit: [true],
      check: [false],
    });
  }

  editRow(element: any) {
    element.patchValue({ edit: true })
  }

  removeRow(index: any) {
    this.formDataArray.controls.splice(index, 1);
    this.setdataTable();
  }

  addNewLine() {
    this.formData.status === 'VALID' && this.formDataArray.push(
      this.createFormGroup({
        currency: '',
        amount: '',
        edit: true,
        check: false
      })
    );
    this.setdataTable();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if (this.data.action === 'edit') {
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
    console.log(this.selection)
  }


  addColumn() {
    // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  submit() {
    this.transactionMonitoringService.closeAmount({ payload: this.formData.value.formArray, selected: this.selection.selected });
  }

  cancel() {
    this.transactionMonitoringService.closeAmount();
  }
}
