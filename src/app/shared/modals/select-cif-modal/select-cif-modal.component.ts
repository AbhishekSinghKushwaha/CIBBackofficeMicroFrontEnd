import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionMonitoringService } from 'src/app/core/services/transaction-monitoring/transaction-monitoring.service';
import { StorageService } from 'src/app/core/services/utils/storage.service';

@Component({
  selector: 'app-select-cif-modal',
  templateUrl: './select-cif-modal.component.html',
  styleUrls: ['./select-cif-modal.component.scss']
})
export class SelectCifModalComponent implements OnInit {
  searchForm: FormGroup;
  selections = new SelectionModel<string>(true, []);
  accounts: any[];

  constructor(
    private readonly transactionMonitoringService: TransactionMonitoringService,
    private readonly fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private readonly storageService: StorageService) {
    this.initializeSearchForm();
     const cached =   this.storageService.getData('CIF');
     if (cached){
       this.accounts = cached
     }
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
    this.selections.clear()
    this.getData();
  }

  getData() {
    this.transactionMonitoringService
      .getCompanyCIFs(this.searchF.searchText.value)
      .subscribe((response: any) => {
        response.isSuccessful && (this.accounts = response.data);
        this.storageService.setData('CIF',response.data)
      })
  }

  get searchF(): any {
    return this.searchForm.controls;
  }

  close(): void {
    this.transactionMonitoringService.closeCIF();
  }

  submit() {
    this.transactionMonitoringService.closeCIF(this.selections.selected.map(x => this.accounts.find(y => y.id === x)));
  }

  get selected() {
    return this.selections.selected?.length ? `( ${this.selections.selected?.length} selected )` : ''
  }

}
