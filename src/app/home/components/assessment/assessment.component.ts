import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
import { SubquestionComponent } from '../subquestion/subquestion.component';
import { MatDialog } from '@angular/material/dialog';
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
  selectedOption: string | null = null;
  subQuestionForm : FormGroup
  constructor(private _http: HttpService, public dialog: MatDialog) {
    this.quesForm = new FormGroup({
      isRequired: new FormControl(false),
      othersCheck: new FormControl(false),
      dropDown: new FormControl('', Validators.required),
    });
    this.optionsForm = new FormGroup({
      options1: new FormControl('', Validators.required),
      options2: new FormControl('', Validators.required),
    });
    this.subQuestionForm = new FormGroup({})
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
  subQuestionNumber = 1;
  subQuestionsArray! : any[]
  addSubQuestion(optionValue : any){
    this.subQuestionForm.addControl(this.subQuestionNumber.toString(), new FormControl('', Validators.required));
    this.subQuestionNumber++;
    this.subQuestionsArray = Object.keys(this.subQuestionForm)
  }
  


  delOption(i: number) {
    --this.i;
    this.optionsForm.removeControl(this.optionsArray[i]);
    this.optionsArray.splice(i, 1);
    this.isAddDisabled = false;
  }

  isRequiredHandler(isChecked: any) {
    this.isRequired = isChecked.checked;
  }
  
  saveQuestion() {
    if (!this.quesForm.valid) {
      return;
    }
    const formValues = this.quesForm.value;
    this.assignmentTitle = formValues.AssignmentTitle;
    const qTitle = formValues.question;
    const selectedDropDown = this.selectedDropDown;
    const question = {
      qTitl: qTitle,
      selectedDropDown: selectedDropDown,
      qRequired: this.isRequired.valueOf(),
      options: Object.values(this.optionsForm.value),
    };
    if (question.selectedDropDown != 'textBox') {
      if (this.optionsForm.valid) {
        this.questions.push(question);
      } else {
        alert('Please fill value in the options');
        return;
      }
    } else {
      this.questions.push(question);
    }
    if (!sessionStorage.getItem('AssignmentTitle')) {
      sessionStorage.setItem('AssignmentTitle', this.assignmentTitle);
    }
    this._http.createSubQuestions(this.subQuestionForm.value)

    this.optionsForm.removeControl('option3');
    this.optionsForm.removeControl('option4');
    this.quesForm.removeControl('AssignmentTitle');
    this.selectedDropDown = '';
    this.quesForm.reset({});
    this.optionsForm.reset();
  }

  saveAssignment() {
    const loggedStaff = localStorage.getItem('LoggedStaff');
    const assignment = {
      AssignmentTitle: sessionStorage.getItem('AssignmentTitle'),
      questions: this.questions,
      createdBy: loggedStaff,
    };
    this._http.createAssignment(assignment).subscribe({});
    sessionStorage.removeItem('AssignmentTitle');
    this.quesForm.reset();
    this.optionsForm.reset();
  }
  openDialog() {
    const dialogRef = this.dialog.open(SubquestionComponent);
    dialogRef.afterClosed().subscribe();
  }
}
