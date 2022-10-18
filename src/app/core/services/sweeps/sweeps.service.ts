import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import urlList from '../service-list.json';
import { SweepActionsModalComponent } from 'src/app/shared/modals/sweep-actions-modal/sweep-actions-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SweepsService {

  dialogRef: any;
  private data: any;

  constructor(
    private http: HttpClient,
    private readonly dialog: MatDialog
    ) { }

  open(data: any) {
    this.dialogRef =  this.dialog.open<SweepActionsModalComponent>(SweepActionsModalComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  } 

  get default(): any {
    return this.data;
  }

  close() {
    this.dialogRef.close()
  }  

  getChargeEvents(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.sweeps.getChargeEvents)
  }

  querySweeps(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.sweeps.querySweeps)
  }

  setUpSweep(payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.sweeps.setUpSweep, payload)
  }

  suspendSweep(payload: any): Observable<any> {
    return this.http.put(environment.apiUrl + urlList.sweeps.suspendSweep, payload)
  }

  sweepDetailId(id: any): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.sweeps.sweepDetailId + "?" + id)
  }
}
