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
  isTitleDisabled: boolean = false;
  questions: any[] = [];
  assignmentTitle = '';
  optionsForm!: FormGroup;
  optionsArray: string[] = [];
  isAddDisabled: boolean = false;
  isRequired: boolean = false;

  disabled = false;
  constructor(private _http: HttpService) {
    this.quesForm = new FormGroup({
      isRequired: new FormControl(false),
      othersCheck: new FormControl(false),
      dropDown: new FormControl('', Validators.required),
    });
    this.optionsForm = new FormGroup({
      options1: new FormControl('', Validators.required),
      options2: new FormControl('', Validators.required),
    });
    this.optionsArray = Object.keys(this.optionsForm.value);
    sessionStorage.clear();
  }

  optType = [
    { value: 'checkBox', viewValue: 'Check Box' },
    { value: 'radio', viewValue: 'Radio Button' },
    { value: 'textBox', viewValue: 'Text Box' },
  ];
  selectedOpt(opt: any) {
    this.selectedDropDown = opt.value;
  }
  i = 2;
  addOption() {
    ++this.i;
    if (this.i === 4) {
      this.isAddDisabled = true;
    }
    this.optionsForm.addControl(
      'option' + this.i,
      new FormControl('', Validators.required)
    );
    this.optionsArray = Object.keys(this.optionsForm.value);
    // let toPush = 'option' + this.i;
    // this.optionsArray.push(toPush);
  }
  delOption(i: number) {
    --this.i;
    this.optionsForm.removeControl(this.optionsArray[i]);
    this.optionsArray.splice(i, 1);
    this.isAddDisabled = false;
  }
  isRequiredHandler(isChecked: any) {
    this.isRequired = isChecked.checked;
    console.log(this.isRequired);
  }
  saveQuestion() {
    if (this.quesForm.valid) {
      const formValues = this.quesForm.value;
      this.assignmentTitle = formValues.AssignmentTitle;
      const qTitle = formValues.question;
      const selectedDropDown = this.selectedDropDown;
      const question = {
        qTitl: qTitle,
        selectedDropDown: selectedDropDown,
        qRequired: this.isRequired.valueOf(),
        options: this.optionsForm.value,
      };
      if (question.selectedDropDown != 'textBox') {
        if (this.optionsForm.valid) {
          this.questions.push(question);
        } else {
          alert('Please fill value in the options');
          return;
        }
      } else {
        delete question.options;
        this.questions.push(question);
      }
      if (!sessionStorage.getItem('AssignmentTitle')) {
        sessionStorage.setItem('AssignmentTitle', this.assignmentTitle);
      }
      console.log(question);
      this.optionsForm.removeControl('option3');
      this.optionsForm.removeControl('option4');
      this.quesForm.removeControl('AssignmentTitle');
      this.selectedDropDown = '';
      this.quesForm.reset();
      this.optionsForm.reset();
    }
  }

  saveAssignment() {
    const loggedStaff = localStorage.getItem('LoggedStaff');
    const assignment = {
      AssignmentTitle: sessionStorage.getItem('AssignmentTitle'),
      questions: this.questions,
      createdBy: loggedStaff,
    };
    console.log(assignment);
    this._http.createAssignment(assignment).subscribe();
    sessionStorage.removeItem('AssignmentTitle');

    this.quesForm.reset();
    this.optionsForm.reset();
  }
}
