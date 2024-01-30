import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssessmentComponent } from '../assessment/assessment.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private _router : Router, public dialog: MatDialog){}
  logout(){
    localStorage.removeItem("LoggedStaff");
    this._router.navigateByUrl('login');
  }
  openDialog() {
    const dialogRef = this.dialog.open(AssessmentComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
