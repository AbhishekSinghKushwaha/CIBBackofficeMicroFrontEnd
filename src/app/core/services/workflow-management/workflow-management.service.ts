import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import urlList from '../service-list.json';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowManagementService {

  private dataSource = new BehaviorSubject<string>("service");
  public currentData = this.dataSource.asObservable();

  constructor(private readonly http: HttpClient) { }

  getWorkFlowById(payload: any): void {
    this.dataSource.next(payload);
  }

  createWorkflow(payload: any, companyId: string) {
    return this.http.post(`${environment.apiUrl}${urlList.workflowManagement.createWorkflow}/${companyId}`, payload);
  }

  updateWorkflow(payload: any, companyId: string) {
    return this.http.post(`${environment.apiUrl}${urlList.workflowManagement.createWorkflow}/${companyId}`, payload);
  }

  getWorkflows(companyId: string) {
    return this.http.get(`${environment.apiUrl}${urlList.workflowManagement.getWorkflows}/${companyId}`);
  }

  deleteWorkflow( workflowSettingsId: string) {
    return this.http.delete(`${environment.apiUrl}${urlList.workflowManagement.deleteWorkflow}/${workflowSettingsId}`);
  }
 
  getWorkflowId(companyId: string, workflowSettingsId: string) {
    return this.http.get(`${environment.apiUrl}${urlList.workflowManagement.getWorkflowId}/${companyId}/settings/${workflowSettingsId}`);
  }
}
