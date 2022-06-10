import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/core/services/confirmation/confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  transactionDetails: any;

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getAccountDetails();
  }

  getAccountDetails() {
    this.confirmationService.currentData.subscribe((data) => {
      this.transactionDetails = data;
    });
  }

  backToOverview() {
    this.router.navigate(['/customer-services/corporate-360/overview']);
  }


}
