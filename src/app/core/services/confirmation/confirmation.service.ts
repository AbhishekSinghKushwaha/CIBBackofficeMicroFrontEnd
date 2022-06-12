import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  private dataSource = new BehaviorSubject<string>("service");
  public currentData = this.dataSource.asObservable();

  constructor() { }

  confirmationDetails(payload: any): void {
    this.dataSource.next(payload);
    console.log(this.currentData, "currentData");
  }
}
