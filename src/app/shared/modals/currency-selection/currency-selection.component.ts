import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CurrencyModel } from 'src/app/core/domain/transfer.models';
import { CurrencySelectionService } from 'src/app/core/services/modal-services/currency-selection.service';

@Component({
  selector: 'app-currency-selection',
  templateUrl: './currency-selection.component.html',
  styleUrls: ['./currency-selection.component.scss'],
})
export class CurrencySelectionComponent implements OnInit {
  selected: CurrencyModel;

  constructor(
    private readonly dialogRef: MatDialogRef<CurrencySelectionComponent>,
    private readonly currencySelectionService: CurrencySelectionService,
    @Inject(MAT_DIALOG_DATA) public data: CurrencyModel[]
  ) {
    this.selected = this.currencySelectionService.default;
    this.currencySelectionService.selected.subscribe(
      (x) => {
        if (x) {
          this.selected = x;
          this.close()
        }
      }
    );
  }

  ngOnInit(): void { }

  close(): void {
    this.dialogRef.close(true);
  }
}
