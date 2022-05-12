import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-management-top-nav',
  templateUrl: './profile-management-top-nav.component.html',
  styleUrls: ['./profile-management-top-nav.component.scss']
})
export class ProfileManagementTopNavComponent implements OnInit {
  @Input() title: string;
  @Input() toolbarPage: string;
  constructor() {}

  ngOnInit(): void {}
}
