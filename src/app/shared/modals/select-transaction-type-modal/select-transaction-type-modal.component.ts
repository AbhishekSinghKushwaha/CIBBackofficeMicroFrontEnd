import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionMonitoringService } from 'src/app/core/services/transaction-monitoring/transaction-monitoring.service';

@Component({
  selector: 'app-select-transaction-type-modal',
  templateUrl: './select-transaction-type-modal.component.html',
  styleUrls: ['./select-transaction-type-modal.component.scss']
})
export class SelectTransactionTypeModalComponent implements OnInit {
  searchForm: FormGroup;
  selections = new SelectionModel<string>(true, []);
  transactionTypes: any[];

  constructor(
    private readonly transactionMonitoringService: TransactionMonitoringService,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any[]) {
  }

  ngOnInit(): void {
    this.getData();
    for (const selection of this.data) {
      this.selections.select(selection);
    }
  }

  getData() {
    this.transactionMonitoringService
      .getTransactionTypes()
      .subscribe((response: any) => {
        this.transactionTypes = response;
      })

  }

  close(): void {
    this.transactionMonitoringService.closeTransactionType();
  }

  submit() {
    this.transactionMonitoringService
      .closeTransactionType(this.selections.selected.map(x => this.transactionTypes.find(y => y.id === x)));
  }

  get selected() {
    return this.selections.selected?.length ? `( ${this.selections.selected?.length} selected )` : ''
  }
}
