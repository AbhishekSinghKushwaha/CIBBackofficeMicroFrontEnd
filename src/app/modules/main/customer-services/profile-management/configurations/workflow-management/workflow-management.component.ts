import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkflowManagementModel } from 'src/app/core/domain/workflow-management.model';
import { Router } from '@angular/router';
import { WorkflowManagementService } from 'src/app/core/services/workflow-management/workflow-management.service';

export type WorkflowStatus = 'active' | 'disabled';

export interface Workflow {
  workflowname: string;
  product: string;
  account: string;
  status: WorkflowStatus;
}

@Component({
  selector: 'app-workflow-management',
  templateUrl: './workflow-management.component.html',
  styleUrls: ['./workflow-management.component.scss']
})

export class WorkflowManagementComponent implements OnInit, AfterViewInit {

  companyId= "16bdac12-7117-4c43-9389-851e9d039086";

  existingWorkflow: boolean;

  @ViewChild(MatSort)
  private sort: MatSort;

  displayedColumns: string[] = [
    'workflowname',
    'product',
    'account',
    'status',
    'actions'
  ];

  dataSource: MatTableDataSource<WorkflowManagementModel>;

  payload: any;

  constructor(
    private router: Router,
    private workflowManagementService: WorkflowManagementService
  ) { }

  ngOnInit(): void {
    this.getDataByCompanyId();
  }

  getDataByCompanyId() {
    this.dataSource = new MatTableDataSource();

    this.workflowManagementService.getWorkflows(this.companyId).subscribe((res: any) => {
      this.existingWorkflow = true;
      this.dataSource.data = res.data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  openActionsMenu(workflow: any) {
    this.payload = {
      companyId: this.companyId,
      workflowSettingsId: workflow.id
    }
    this.workflowManagementService.getWorkFlowById(this.payload);
  }

  createWorkflow() {
    this.router.navigate(['/customer-services/create-workflow-management']);
  }

  viewWorkflow() {
    this.router.navigate(['/customer-services/workflow-management/view']);
  }

  updateWorkflow() {
    this.router.navigate(['/customer-services/workflow-management/update']);
  }

  deleteWorkflow() {
    this.workflowManagementService.deleteWorkflow(this.payload.workflowSettingsId).subscribe((res: any) => {
    });
  }

}
