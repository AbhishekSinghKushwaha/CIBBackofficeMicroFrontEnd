import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-file-templates',
  templateUrl: './new-file-templates.component.html',
  styleUrls: ['./new-file-templates.component.scss']
})
export class NewFileTemplatesComponent implements OnInit {
  step = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
