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
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigate() {
    this.router.navigate(['/customer-services/corporate-onboarding']);
  }
}
