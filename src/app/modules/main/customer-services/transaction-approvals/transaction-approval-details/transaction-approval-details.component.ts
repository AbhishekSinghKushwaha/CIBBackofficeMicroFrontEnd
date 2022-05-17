import { Component, OnInit } from '@angular/core';
import { BiometricVerificationService } from 'src/app/core/services/biometric-verification/biometric-verification.service';

interface Approval {
  text: string;
  subtext: string;
}

@Component({
  selector: 'app-transaction-approval-details',
  templateUrl: './transaction-approval-details.component.html',
  styleUrls: ['./transaction-approval-details.component.scss']
})
export class TransactionApprovalDetailsComponent implements OnInit {

  constructor(
    private readonly biometricVerificationService: BiometricVerificationService
  ) { }

  ngOnInit(): void {
  }

  approval: Approval[] = [
    {text: 'Approve', subtext: 'The details provided by the maker are all okay.'},
    {text: 'Return', subtext: 'The details provided by the maker need correction.'},
    {text: 'Reject', subtext: 'The details provided by the maker are not genuine.'},
  ];

  Submit() {
    this.biometricVerificationService.open();
  }

}
