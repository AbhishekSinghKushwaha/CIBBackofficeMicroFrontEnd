import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SweepsService } from 'src/app/core/services/sweeps/sweeps.service';

@Component({
  selector: 'app-sweep',
  templateUrl: './sweep.component.html',
  styleUrls: ['./sweep.component.scss']
})
export class SweepComponent implements OnInit, AfterViewInit {

  existingSweeps: boolean;
  ELEMENT_DATA: any[] = [];
  suspendSweepData: any;
  revokeSweepData: any;
  viewSweepData: any;
  selectedSweepData: any;

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort)
  private sort: MatSort;

  displayedColumns: string[] = [
    'sweepName',
    'sourceAccount',
    'destinationAccount',
    'startDate',
    'actions'
  ];

  constructor(
    private router: Router,
    private readonly sweepsService: SweepsService
  ) { }

  ngOnInit(): void {
    this.getSweeps();
  }

  getSweeps() {
    // this.sweepsService.querySweeps().subscribe((res: any) => {
    //   if(res.isSuccessful) {
    //     this.ELEMENT_DATA = res.data
    //   }
    // })
      this.ELEMENT_DATA = [
        {
          id: 1,
          sweepName: 'Current to invest',
          sourceAccount: 'Current account',
          destinationAccount: 'Investment account',
          startDate: '05/05/22',
        },
        {
          id: 2,
          sweepName: 'Ordinary to invest',
          sourceAccount: 'Ordinary account',
          destinationAccount: 'Investment account',
          startDate: '01/03/20',
        },
        {
          id: 3,
          sweepName: 'Social to invest',
          sourceAccount: 'Social institute account',
          destinationAccount: 'Investment account',
          startDate: '30/10/21',
        }
      ];
      
      this.existingSweeps = true;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  openActionsMenu(sweep: any) {
    console.log(sweep, "sweep");
    this.selectedSweepData = sweep;
    console.log(this.selectedSweepData.id);
  }

  setUpSweep() {
    this.router.navigate(['/customer-services/setup-sweep']);
  }

  viewSweep() {
    // this.sweepsService.sweepDetailId(this.selectedSweepData.id).subscribe((res: any) => {
    //   if(res.isSuccessful){
    //     this.viewSweepData = res.data;
    //   }
    // })
    // const payload = {
    //   id: this.viewSweepData.id,
    //   title: 'Suspend sweep',
    //   sourceAccount: this.viewSweepData.sourceAccount,
    //   destinationAccount: this.viewSweepData.destinationAccount,
    //   sweepName: this.viewSweepData.sweepName,
    //   startDate: this.viewSweepData.startDate,
    //   executionMode: this.viewSweepData.executionMode,
    //   // executionDetails: this.viewSweepData.,
    //   frequency: this.viewSweepData.execution,
    //   holidays: this.viewSweepData.holidaysAndWeekendsExecution
    // }
    const payload = {
      id: 1,
      title: 'View Sweep',
      sourceAccount: 'Current account',
      destinationAccount: 'Investment account',
      sweepName: 'Test',
      startDate: '01/02/2050',
      executionMode: 'Time of day',
      executionDetails: '17:00',
      frequency: 'Weekly',
      holidays: 'Skip'
    }
    this.sweepsService.open(payload);
  }

  editSweep() {
    console.log('edit Sweep');
  }

  suspendSweep() {
    // this.sweepsService.sweepDetailId(this.selectedSweepData.id).subscribe((res: any) => {
    //   if(res.isSuccessful){
    //     this.suspendSweepData = res.data;
    //   }
    // })
    // const payload = {
    //   id: this.suspendSweepData.id,
    //   title: 'Suspend sweep',
    //   sourceAccount: this.suspendSweepData.sourceAccount,
    //   destinationAccount: this.suspendSweepData.destinationAccount,
    //   sweepName: this.suspendSweepData.sweepName,
    //   startDate: this.suspendSweepData.startDate,
    //   executionMode: this.suspendSweepData.executionMode,
    //   // executionDetails: this.suspendSweepData.,
    //   frequency: this.suspendSweepData.execution,
    //   holidays: this.suspendSweepData.holidaysAndWeekendsExecution
    // }
    const payload = {
      id: 2,
      title: 'Suspend sweep',
      sourceAccount: 'Current account',
      destinationAccount: 'Investment account',
      sweepName: 'Test',
      startDate: '01/02/2050',
      executionMode: 'Time of day',
      executionDetails: '17:00',
      frequency: 'Weekly',
      holidays: 'Skip'
    }
    this.sweepsService.open(payload);
  }

  revokeSweep() {
    // this.sweepsService.sweepDetailId(this.selectedSweepData.id).subscribe((res: any) => {
    //   if(res.isSuccessful){
    //     this.revokeSweepData = res.data;
    //   }
    // })
    // const payload = {
    //   id: this.revokeSweepData.id,
    //   title: 'Suspend sweep',
    //   sourceAccount: this.revokeSweepData.sourceAccount,
    //   destinationAccount: this.revokeSweepData.destinationAccount,
    //   sweepName: this.revokeSweepData.sweepName,
    //   startDate: this.revokeSweepData.startDate,
    //   executionMode: this.revokeSweepData.executionMode,
    //   // executionDetails: this.revokeSweepData.,
    //   frequency: this.revokeSweepData.execution,
    //   holidays: this.revokeSweepData.holidaysAndWeekendsExecution
    // }
    const payload = {
      id: 3,
      title: 'Revoke sweep',
      sourceAccount: 'Current account',
      destinationAccount: 'Investment account',
      sweepName: 'Test',
      startDate: '01/02/2050',
      executionMode: 'Time of day',
      executionDetails: '17:00',
      frequency: 'Weekly',
      holidays: 'Skip'
    }
    this.sweepsService.open(payload);
  }

}
