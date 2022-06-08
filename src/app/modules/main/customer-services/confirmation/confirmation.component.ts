import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionApprovalService } from 'src/app/core/services/transaction-approval/transaction-approval.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  transactionDetails: any;

  constructor(
    private router: Router,
    private transactionApprovalService: TransactionApprovalService
  ) { }

  ngOnInit(): void {
    this.getAccountDetails();
  }

  getAccountDetails() {
    this.transactionApprovalService.currentData.subscribe((data) => {
      this.transactionDetails = data;
    });
  }

  backToOverview() {
    this.router.navigate(['/customer-services/corporate-360/overview']);
  }


}
