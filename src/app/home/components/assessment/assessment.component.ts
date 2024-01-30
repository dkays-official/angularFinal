import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css',
})
export class AssessmentComponent {
  selectedDropDown: any;
  quesForm: FormGroup;
  constructor() {
    this.quesForm = new FormGroup({});
  }
  options = ['Option1', 'Option2', 'Option3', 'Option4', 'Option5', 'Option6'];
  optType = [
    { value: 'checkBox', viewValue: 'Check Box' },
    { value: 'radio', viewValue: 'Radio Button' },
    { value: 'textBox', viewValue: 'Text Box' },
  ];
  selectedOpt(opt: any) {
    this.selectedDropDown = opt.value;
  }
}
