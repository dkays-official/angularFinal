import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';

@Component({
  selector: 'app-subquestion',
  templateUrl: './subquestion.component.html',
  styleUrls: ['./subquestion.component.css'],
})
export class SubquestionComponent {
  subQuestionsForm: FormGroup;
  subQuestionNumber = 1;
  subQuestionsArray: any;

  constructor(private _http: HttpService) {
    this.subQuestionsForm = new FormGroup({
      subQuestion1: new FormControl('', Validators.required),
    });
    this.subQuestionsArray = Object.keys(this.subQuestionsForm.controls);
  }

  addSubQuestion() {
    const controlName = 'subQuestion' + ++this.subQuestionNumber;
    this.subQuestionsForm.addControl(
      controlName,
      new FormControl('', Validators.required)
    );
    this.subQuestionsArray = Object.keys(this.subQuestionsForm.controls);
  }
  saveSubQuestions() {
    this._http.createSubQuestions(this.subQuestionsForm.value).subscribe({});
  }
}
