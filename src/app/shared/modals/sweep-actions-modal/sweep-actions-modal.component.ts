import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BiometricVerificationService } from 'src/app/core/services/biometric-verification/biometric-verification.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { SweepsService } from 'src/app/core/services/sweeps/sweeps.service';

@Component({
  selector: 'app-sweep-actions-modal',
  templateUrl: './sweep-actions-modal.component.html',
  styleUrls: ['./sweep-actions-modal.component.scss']
})
export class SweepActionsModalComponent implements OnInit {

  sweepDetailsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<SweepActionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly biometricVerificationService: BiometricVerificationService,
    private readonly sweepsService: SweepsService
  ) { }

  get getForm() {
    return this.sweepDetailsForm.controls;
  }

  ngOnInit(): void {
    console.log(this.data, 'data');
    this.intiForm();
  }

  intiForm(): void {
    this.sweepDetailsForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  edit() {
    this.dialogRef.close(true);
  }

  suspend() {
    this.dialogRef.close(true);
    this.biometricVerificationService.open();

    // const payload = {
    //   startDate: this.getForm.startDate.value.toISOString(),
    //   endDate: this.getForm.endDate.value.toISOString(),
    //   id: this.data.id
    // }
    // this.sweepsService.suspendSweep(payload).subscribe((res: any) => {
    //   if(res.isSuccessful) {
    //     this.dialogRef.close(true);
    //     this.biometricVerificationService.open();
    //   }
    // });
  }

  revoke() {
    this.dialogRef.close(true);
    this.biometricVerificationService.open();
  }

  reinitiate() {
    this.dialogRef.close(true);
    this.biometricVerificationService.open();
  }
}
