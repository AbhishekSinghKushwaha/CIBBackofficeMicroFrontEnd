import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { FromAccount } from "src/app/core/domain/transfer.models";
import { TransferFromService } from "src/app/core/services/modal-services/transfer-from.service";
@Component({
  selector: "app-account-dropdown-item",
  templateUrl: "./account-dropdown-item.component.html",
  styleUrls: ["./account-dropdown-item.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AccountDropdownItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: FromAccount;
  @Input() transferType: string;
  accounts: FromAccount[];
  constructor(
    private readonly transferFromService: TransferFromService,
  ) {}

  ngOnInit(): void {}

  select(): void {
    switch (this.transferType) {
      case "from":
        this.transferFromService.setTransferFromAccount(this.data);
        break;
      default:
        break;
    }
  }
}
