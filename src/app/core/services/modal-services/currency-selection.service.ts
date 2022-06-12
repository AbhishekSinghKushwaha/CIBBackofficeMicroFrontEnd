import { Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CurrencyModel } from "../../domain/transfer.models";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import urlList from "../service-list.json";
import { CurrencySelectionComponent } from "src/app/shared/modals/currency-selection/currency-selection.component";
import { StorageService } from "../utils/storage.service";
export interface ConversionPayload {
  sourceAccount: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
}
@Injectable({ providedIn: "root" })
export class CurrencySelectionService {
  selected = new Subject<CurrencyModel>();
  private data: CurrencyModel;
  modalRef: MatDialogRef<CurrencySelectionComponent, any>;

  constructor(private readonly dialog: MatDialog,
    private http: HttpClient,
    private readonly storageService: StorageService) { }

  open(data: any) {
    // const currencies = this.storageService.getData("currencies");
    this.modalRef = this.dialog.open<CurrencySelectionComponent, any>(
      CurrencySelectionComponent,
      {
        disableClose: true,
        data,
      }
    );
    return this.modalRef;
  }

  get default(): CurrencyModel {
    return this.data;
  }

  select(currency: CurrencyModel): void {
    this.data = currency;
    this.selected.next(currency);
  }

  closeModal(data: { selected: CurrencyModel, selections: string[] }): void {
    this.modalRef.close(data);
  }

  getConversionRate(payload: ConversionPayload): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + urlList.transfers.getConversionRate,
      payload
    );
  }
}
