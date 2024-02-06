import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssessmentComponent } from '../assessment/assessment.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  loggedStaff: any;
  constructor(private _router: Router, public dialog: MatDialog) {
    if (localStorage.getItem('LoggedStaff')) {
      this.loggedStaff = localStorage.getItem('LoggedStaff');
      this.loggedStaff = this.loggedStaff.toUpperCase();
    }
  }
  logout() {
    localStorage.removeItem('LoggedStaff');
    this._router.navigateByUrl('login');
  }
  openDialog() {
    const dialogRef = this.dialog.open(AssessmentComponent);
    dialogRef.afterClosed().subscribe();
  }
}
