import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../../shared/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private _http: HttpService, private _router: Router) {
    this.loginForm = new FormGroup({});
  }
  login() {
    const staffData = this.loginForm.value;
    this._http.getStaff().subscribe((staff) => {
      staff.forEach((user: any) => {
        if (
          this.loginForm.valid &&
          user.username == staffData.username &&
          user.password == staffData.password
        ) {
          localStorage.setItem('LoggedStaff', staff);
          this._router.navigateByUrl('/homepage')
          
        }
      });
      });
      
  }
}
