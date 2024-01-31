import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpService } from '../../../shared/services/http.service';
@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css',
})
export class AssessmentComponent {
  selectedDropDown: any;
  quesForm: FormGroup;
  isChecked! : false;
  isTitleDisabled : boolean = false;
  questions: any[] = [];
  assignmentTitle = "";


  disabled = false;
  constructor(private _http : HttpService) {
    this.quesForm = new FormGroup({});
  }
  options = ['Option1', 'Option2'];
  optType = [
    { value: 'checkBox', viewValue: 'Check Box' },
    { value: 'radio', viewValue: 'Radio Button' },
    { value: 'textBox', viewValue: 'Text Box' },
  ];
  selectedOpt(opt: any) {
    this.selectedDropDown = opt.value;
  }
  addOption(){
    let len = this.options.length
    if(len<3){
      this.options.push("option" + ++len)
    }
    else if(this.options.length == 3){
      this.options.push("option" + ++len)
      this.disabled = true;      
    }
  }
  delOption(i: number){
    this.options.splice(i, 1);
    this.disabled = false;
  }
  addQuestion(){
    if(this.quesForm.valid){
      const formValues = this.quesForm.value;
      this.assignmentTitle = formValues.AssignmentTitle;
      if(this.quesForm.controls['AssignmentTitle']){
        this.quesForm.removeControl("AssignmentTitle")
      }
      const qTitle = formValues.question;
      const selectedDropDown = this.selectedDropDown;
      let options : any[] = [];
      let qRequired = false;
      if(this.isChecked){
        qRequired = true;
      }
      if(this.selectedDropDown == "radio" || this.selectedDropDown == "checkBox")       
      this.options.forEach((option : any)=>{
       options.push(option)
      })
      const modeOfAns = this.selectedDropDown;
      let question = {"qTitl": qTitle,
      "selectedDropDown" : selectedDropDown,
      "qRequired" : qRequired,
      "options": options,
      "modeOfAns": modeOfAns
      }
      this.questions.push(question)
      this.quesForm.reset()
    }
  }

  saveAssignment(){
    let assignment = {"AssignmentTitle": this.assignmentTitle,
    "questions": this.questions  
  }
    this._http.createAssignment(assignment)
  }
  checkBoxHandler(isCheck: any){
    this.isChecked = isCheck;
  }
}
