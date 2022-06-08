import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ConfigureFileTemplatesModalComponent } from 'src/app/shared/modals/configure-file-templates-modal/configure-file-templates-modal.component';
import { environment } from 'src/environments/environment';
import { TemplateModel } from '../../domain/file-template.model';
import urlList from '../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class FileTemplateService {
  fileTemplate: TemplateModel[];
  fileTemplate$ = new BehaviorSubject<TemplateModel[]>([]);
  templateBuilderRef: MatDialogRef<ConfigureFileTemplatesModalComponent, any>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly http: HttpClient) { }

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

  saveTemplate(payload: any) {
    return this.http.post(`${environment.apiUrl}${urlList.fileTemplate.submitFileTemplate}/${payload.corporateId}`, payload)
  }

  getTemplates(corporateId: string) {
    return this.http.get(`${environment.apiUrl}${urlList.fileTemplate.submitFileTemplate}/${corporateId}`)
  }

}
