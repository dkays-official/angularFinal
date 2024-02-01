import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css',
})
export class AssessmentComponent {
  selectedDropDown!: string;
  quesForm: FormGroup;
  isChecked: boolean = false;
  isTitleDisabled: boolean = false;
  questions: Object[] = [];
  assignmentTitle = '';
  optionsForm!: FormGroup;

  disabled = false;
  constructor(private _http: HttpService) {
    this.quesForm = new FormGroup({});
    this.optionsForm = new FormGroup({});
  }
  options: string[] = ['Option1', 'Option2'];
  optType = [
    { value: 'checkBox', viewValue: 'Check Box' },
    { value: 'radio', viewValue: 'Radio Button' },
    { value: 'textBox', viewValue: 'Text Box' },
  ];
  selectedOpt(opt: any) {
    this.selectedDropDown = opt.value;
  }
  addOption() {
    let i = 2;
    this.optionsForm.addControl(
      'option' + ++i,
      new FormControl('', Validators.required)
    );
  }
  delOption(i: number) {
    this.quesForm.removeControl(this.options[i]);
    this.options.splice(i, 1);
  }
  addQuestion() {
    if (this.quesForm.valid) {
      const formValues = this.quesForm.value;
      this.assignmentTitle = formValues.AssignmentTitle;
      const qTitle = formValues.question;
      const selectedDropDown = this.selectedDropDown;

      let qRequired = false;
      if (this.isChecked) {
        qRequired = true;
      }
      const question = {
        qTitl: qTitle,
        selectedDropDown: selectedDropDown,
        qRequired: qRequired,
        options: this.optionsForm.value,
      };
      if (selectedDropDown != 'textBox') {
        this.questions.push(question);
      } else {
        delete question.options;
        this.questions.push(question);
      }
      localStorage.setItem('AssignmentTitle', this.assignmentTitle);
      this.quesForm.reset();
      this.optionsForm.reset();
      this.quesForm.removeControl('AssignmentTitle');
    }
  }

  saveAssignment() {
    const assignment = {
      AssignmentTitle: this.assignmentTitle,
      questions: this.questions,
    };
    this._http.createAssignment(assignment).subscribe();
    this._http.getAssignments().subscribe((assignments: any) => {});
  }
 
  checkBoxHandler(isCheck: any) {
    this.isChecked = isCheck;
  }
}
