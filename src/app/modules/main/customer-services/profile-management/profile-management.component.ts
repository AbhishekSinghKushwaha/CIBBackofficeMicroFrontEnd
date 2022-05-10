import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss']
})
export class ProfileManagementComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Overview',
        link: '/customer-services/corporate-360/overview',
        index: 0
      },
      {
        label: 'Configurations',
        link: '/customer-services/corporate-360/configurations',
        index: 1
      },
      {
        label: 'Users',
        link: '/customer-services/corporate-360/users',
        index: 2
      },
      {
        label: 'Products',
        link: '/customer-services/corporate-360/products',
        index: 2
      },
      {
        label: 'Global Limits',
        link: '/customer-services/corporate-360/global-limits',
        index: 2
      },
      {
        label: 'Sweeps',
        link: '/customer-services/corporate-360/sweeps',
        index: 2
      },
      {
        label: 'Insurance',
        link: '/customer-services/corporate-360/insurance',
        index: 2
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe(res => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find(tab => tab.link === '.' + this.router.url)
      );
    });
  }
}
