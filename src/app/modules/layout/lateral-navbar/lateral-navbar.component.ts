import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-lateral-navbar',
  templateUrl: './lateral-navbar.component.html',
  styleUrls: ['./lateral-navbar.component.scss']
})
export class LateralNavbarComponent implements OnInit {
  title!: string;
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.title = this.titleService.getTitle();
  }
}
