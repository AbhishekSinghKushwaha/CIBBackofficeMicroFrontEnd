import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent implements OnInit {
  @Output() btnAction = new Subject();
  @Input() btnText:any;
  @Input() description:any;

  constructor() { }

  ngOnInit(): void {
  }

  add(){
    this.btnAction.next()
  }

}
