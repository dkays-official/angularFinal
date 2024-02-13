import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css'],
})
export class QuestionnaireComponent implements OnInit {
  assignmentId: any;
  assignment: any;
  i: number = 0;
  quesAns: any[] = [];
  selectedCheckBox!: string;
  selectedRadio!: string;
  textBoxValue!: string;

  constructor(private _http: HttpService) {
    this.assignmentId = localStorage.getItem('assignmentId');
    this._http.getSingleAssignment(this.assignmentId).subscribe({
      next: (assignment) => {
        this.assignment = assignment;
        console.log(assignment);
      },
      error: (err) => console.log('An error occurred ' + err),
    });
  }

  ngOnInit() {}

  checkBoxHandler(value: any) {
    this.selectedCheckBox = value;
  }

  next(quesIndex: number) {
    let qnA: any = {};

    if (this.assignment && this.assignment.questions) {
      if (this.assignment.questions[quesIndex].selectedDropDown === 'textBox') {
        qnA = {
          question: this.assignment.questions[quesIndex].qTitl,
          ans: this.textBoxValue,
        };
      } else if (
        this.assignment.questions[quesIndex].selectedDropDown === 'checkBox'
      ) {
        qnA = {
          question: this.assignment.questions[quesIndex].qTitl,
          ans: this.selectedCheckBox,
        };
      } else if (
        this.assignment.questions[quesIndex].selectedDropDown === 'radio'
      ) {
        qnA = {
          question: this.assignment.questions[quesIndex].qTitl,
          ans: this.selectedRadio,
        };
      }
      this.quesAns.push(qnA);
      this.i++;
    }
  }

  previous() {
    this.i--;
  }

  done() {
    this.next(this.assignment.questions.length - 1);
    const response = {
      assignmentTitle: this.assignment.AssignmentTitle,
      quesAns: this.quesAns,
      assignmentId : this.assignmentId
    };
    this._http.saveResponse(response).subscribe({
      next: response=>response,
      error: err=>console.log("Something went wrong " + err)
    });
  }
}
