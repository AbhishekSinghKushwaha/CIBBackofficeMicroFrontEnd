import { StateService } from './../state/state.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import urlList from '../service-list.json';

interface CorporateServiceState {
  corporateAccount: any

}

const initialState: CorporateServiceState = {
  corporateAccount: {}
}

@Injectable({
  providedIn: 'root'
})
export class CifService extends StateService<CorporateServiceState> {

  selectedCorproate$: Observable<any> = this.select(
    (state) => state.corporateAccount
  )

  constructor(private http: HttpClient) {
    super(initialState);
  }

  // Get corporate from cif number
  getCorporateByCif(cifNumber: string): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.cif.getCorporateByCif + cifNumber
    )
  }

  setCorporate(corporateAccount: any) {
    this.setState({
      corporateAccount
    })
  }
}
