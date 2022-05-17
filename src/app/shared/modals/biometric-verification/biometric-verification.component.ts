import { Component, OnInit } from '@angular/core';
import { BiometricVerificationService } from 'src/app/core/services/biometric-verification/biometric-verification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-biometric-verification',
  templateUrl: './biometric-verification.component.html',
  styleUrls: ['./biometric-verification.component.scss']
})
export class BiometricVerificationComponent implements OnInit {

  constructor(
    private readonly dialogRef: MatDialogRef<BiometricVerificationComponent>,
    private readonly biometricVerificationService: BiometricVerificationService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(true);
  }

}
