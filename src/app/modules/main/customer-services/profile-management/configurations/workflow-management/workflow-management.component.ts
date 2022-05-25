import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkflowManagementModel } from 'src/app/core/domain/workflow-management.model';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.existingWorkflow = true;

    this.dataSource = new MatTableDataSource();
      const data: WorkflowManagementModel[] = [
        {
          workflowname: 'Bulk Payment',
          product: 'Transact',
          account: 'John Ogbu',
          status: 'Active'
        },
        {
          workflowname: 'Beneficiary',
          product: 'Beneficiary',
          account: 'Teslim James',
          status: 'Disabled'
        }
    ];
       
      this.dataSource.data = data;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  openActionsMenu(workflow: Workflow) {
    console.log(workflow);
  }

  createWorkflow() {
    this.router.navigate(['/customer-services/create-workflow-management']);
  }

  viewWorkflow() {
    this.router.navigate(['/customer-services/workflow-management/1/view']);
  }

  updateWorkflow() {
    this.router.navigate(['/customer-services/workflow-management/1/update']);
  }

}
