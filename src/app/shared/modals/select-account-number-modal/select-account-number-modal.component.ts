import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionMonitoringService } from 'src/app/core/services/transaction-monitoring/transaction-monitoring.service';

@Component({
  selector: 'app-select-account-number-modal',
  templateUrl: './select-account-number-modal.component.html',
  styleUrls: ['./select-account-number-modal.component.scss']
})
export class SelectAccountNumberModalComponent implements OnInit {
searchForm: FormGroup;
  selections = new SelectionModel<string>(true, []);
  accounts: any[];

  constructor(
    private readonly transactionMonitoringService: TransactionMonitoringService,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any[]) {
    this.initializeSearchForm();
  }

  ngOnInit(): void {
    for (const selection of this.data) {
      this.selections.select(selection);
    }
  }

  initializeSearchForm(): void {
    this.searchForm = this.fb.group({
      searchText: [null, Validators.required]
    });
  }

  onSearchSubmit(): void {
    if (this.searchForm.status === 'INVALID') {
      return;
    }
    this.getData();
  }

  getData() {
    this.transactionMonitoringService
      .getAccountNumbers(this.searchF.searchText.value)
      .subscribe((response: any) => {
        this.accounts = response;
      })

  }

  get searchF(): any {
    return this.searchForm.controls;
  }

  close(): void {
    this.transactionMonitoringService.closeAccountNumber();
  }

  submit() {
    this.transactionMonitoringService.closeAccountNumber(this.selections.selected);
  }

  get selected() {
    return this.selections.selected?.length ? `( ${this.selections.selected?.length} selected )` : ''
  }
}
