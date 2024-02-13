import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../../../shared/services/http.service';
import { QuestionnaireComponent } from '../questionnaire/questionnaire.component';

@Component({
  selector: 'app-takeassignment',
  templateUrl: './takeassignment.component.html',
  styleUrl: './takeassignment.component.css',
})
export class TakeassignmentComponent {
  assignments!: any;
  createdOn: Date = new Date();
  constructor(public dialog: MatDialog, private _http: HttpService) {
    this._http.getAssignments().subscribe((data) => {
      this.assignments = data;
    });
  }
  openDialog(title: any) {
    localStorage.setItem("assignmentId", title)
    const dialogRef = this.dialog.open(QuestionnaireComponent);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
