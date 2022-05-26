import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BiometricVerificationComponent } from 'src/app/shared/modals/biometric-verification/biometric-verification.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiometricVerificationService {

  dialogRef: any;

  constructor(private readonly dialog: MatDialog) { }

  open() {
    this.dialogRef =  this.dialog.open<BiometricVerificationComponent>(BiometricVerificationComponent, {
      disableClose: true,
    });
    return this.dialogRef;
  } 

  close() {
    this.dialogRef.close()
  }
}
