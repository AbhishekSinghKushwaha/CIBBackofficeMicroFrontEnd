import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { StorageService } from 'src/app/core/services/utils/storage.service';

@Component({
  selector: 'app-corporate-user-accounts',
  templateUrl: './corporate-user-accounts.component.html',
  styleUrls: ['./corporate-user-accounts.component.scss']
})
export class CorporateUserAccountsComponent implements OnInit {
  activeAccounts: any[];
  @Output() selectedAccounts = new Subject();
  @Input() username: any;
  private _accounts: any[];
  loadedAccounts: string[];
  @Input() set accounts(input: any[]) {
    this._accounts = input;
    this.setAlreadySelectedAccounts(input);
  };
  get accounts(): any[] {
    return this._accounts || [];
  }

  constructor(
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activeAccounts = [];
  }

  ngOnInit(): void {
  }

  setAlreadySelectedAccounts(allAccounts: any[]) {
    console.log(allAccounts)
    if (allAccounts?.length) {
      const oldActiveAccounts = this.storageService.getData("selected-accounts");
      this.activeAccounts = [];
      // allAccounts?.forEach((acc: any) => {
      //   if (oldActiveAccounts?.map((x: any) => x.id).indexOf(acc.accountNumber) > -1) {
      //     this.activeAccounts.push(acc);
      //   }
      // })
    }

  }

  toggle(subAccountNumber: string): void {
    const selectedAccountIndex = this.activeAccounts?.findIndex(
      (sub: any) => sub.accountNumber === subAccountNumber
    );
    if (selectedAccountIndex > -1) {
      this.activeAccounts.splice(selectedAccountIndex, 1);
    } else {
      this.activeAccounts.push(this.accounts.find(account=>account.accountNumber === subAccountNumber));
    }
    this.selectedAccounts.next(this.activeAccounts);
  }

  isParentAccountActive(productId: any): boolean {
    return true;
  }

  mainAccountChange(event: any) {
    if (event.value) {
      this.activeAccounts = this.activeAccounts.filter(x => x.productName === event.value);
      this.selectedAccounts.next(this.activeAccounts);
    }
  }

  isAccountActive(accountNumber: string): boolean {
    return this.activeAccounts.some(
      (acc: any) => {
        return acc?.accountNumber === accountNumber;
      }
    );
  }
}
