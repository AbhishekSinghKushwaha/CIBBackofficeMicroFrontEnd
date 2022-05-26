import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take, map } from 'rxjs/operators';
import { ConfirmDialogModel } from '../../domain/confirm-dialog.model';
import { ConfirmDialogComponent } from 'src/app/shared/modals/confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(private dialog: MatDialog) { }

  public open(options: ConfirmDialogModel) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '22vw',
      panelClass :['my-custom-dialog-class'],
      disableClose: true,
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
    ));
  }

}
