import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigureFileTemplatesModalComponent } from 'src/app/shared/modals/configure-file-templates-modal/configure-file-templates-modal.component';

@Injectable({
  providedIn: 'root'
})
export class FileTemplateService {
  templateBuilderRef: MatDialogRef<ConfigureFileTemplatesModalComponent, any>;

  constructor(private readonly dialog: MatDialog) { }

  openTemplateBuilder(): MatDialogRef<ConfigureFileTemplatesModalComponent, any> {
    this.templateBuilderRef = this.dialog.open<ConfigureFileTemplatesModalComponent, any>(
      ConfigureFileTemplatesModalComponent,
      {
        maxWidth: '50vw',
        disableClose: true,
      }
    );
    return this.templateBuilderRef;
  }

  closeTemplateBuilder(data: any) {
    this.templateBuilderRef.close(data);
  }

}
