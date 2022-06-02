import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'profile-app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class ProfileAddUserComponent implements OnInit {
  category: string;
  info: any = {
    approvers: 'Approver',
    initiators: 'Initiator',
    'super-admin': 'Super Admin'
  }

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,) {

    this.activatedRoute.params.subscribe(({ category }: any) => {
      if (category) {
        this.category = category;
      }

    })
  }

  ngOnInit(): void {
  }

}
