import { CifService } from './../../../../../core/services/cif/cif.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  panelOpenState = {
    additionalInfo: false,
    mandate: true,
    signatories: false
  };
  currentCorporateData: any;
  constructor(private router: Router, private cifService: CifService) { }

  ngOnInit(): void {
    this.cifService.selectedCorproate$.subscribe(data => {
      this.currentCorporateData = data;
    })

    console.log(this.currentCorporateData);
  }

  navigate() {
    this.router.navigate(['/customer-services/corporate-onboarding']);
  }
}
