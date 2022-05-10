import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CorporateSearchModalComponent } from 'src/app/shared/modals/corporate-search-modal/corporate-search-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CorporateSearchService {
  corporateSearchModalRef: MatDialogRef<CorporateSearchModalComponent, any>;
  constructor(private readonly dialog: MatDialog) {}

  // MODAL
  openCorporateSearchModal() {
    this.corporateSearchModalRef = this.dialog.open<
      CorporateSearchModalComponent,
      any
    >(CorporateSearchModalComponent, {
      disableClose: true,
      data: {},
      width: '50vw'
    });
  }
}
