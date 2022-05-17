import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ConfigureFileTemplatesModalComponent } from 'src/app/shared/modals/configure-file-templates-modal/configure-file-templates-modal.component';
import { TemplateModel } from '../../domain/file-template.model';

@Injectable({
  providedIn: 'root'
})
export class FileTemplateService {
  fileTemplate: TemplateModel[];
  fileTemplate$ = new BehaviorSubject<TemplateModel[]>([]);
  templateBuilderRef: MatDialogRef<ConfigureFileTemplatesModalComponent, any>;

  constructor(private readonly dialog: MatDialog) { }

  openTemplateBuilder(action: string, payload: any[], selected: any[]): MatDialogRef<ConfigureFileTemplatesModalComponent, any> {
    this.templateBuilderRef = this.dialog.open<ConfigureFileTemplatesModalComponent, any>(
      ConfigureFileTemplatesModalComponent,
      {
        width: '60vw',
        disableClose: true,
        data: { payload, action, selected }
      }
    );
    return this.templateBuilderRef;
  }

  closeTemplateBuilder(data: any) {
    this.templateBuilderRef.close(data);
  }

}
