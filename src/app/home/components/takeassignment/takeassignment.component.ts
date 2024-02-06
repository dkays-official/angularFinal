import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionaireComponent } from '../questionaire/questionaire.component';
import { HttpService } from '../../../shared/services/http.service';

@Component({
  selector: 'app-takeassignment',
  templateUrl: './takeassignment.component.html',
  styleUrl: './takeassignment.component.css'
})
export class TakeassignmentComponent {
  assignments! : any;
  createdOn : Date = new Date();
  constructor(public dialog: MatDialog, private _http : HttpService){
    this._http.getAssignments().subscribe((data)=>{
      this.assignments = data;        
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(QuestionaireComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  

}
