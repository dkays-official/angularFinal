import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://localhost:3000/';
  constructor(private _http : HttpClient) {}
  getStaff(): Observable<any> {
    return this._http.get(this.url + 'staff');
  }
  createAssignment(assignment: any): Observable<any> {
    return this._http.post(this.url + 'assignments', assignment);
  }
}
