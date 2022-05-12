import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.scss']
})
export class AddWorkflowComponent implements OnInit {
  panelOpenState = {
    workflowDetails: true,
    products: true,
    fxReferenceOption: true,
    approvalSequence: true,
    approvers: true,
    checkers: true
  };
  constructor() {}

  ngOnInit(): void {}
}
