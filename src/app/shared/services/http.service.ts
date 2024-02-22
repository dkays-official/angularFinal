import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  url = 'http://localhost:3000/';
  constructor(private _http: HttpClient) {}
  getStaff(): Observable<any> {
    return this._http.get(this.url + 'staff');
  }
  getAssignments(): Observable<any> {
    return this._http.get(this.url + 'assignments');
  }
  createAssignment(assignment: any): Observable<any> {
    return this._http.post(this.url + 'assignments', assignment);
  }
  getSingleAssignment(id: string): Observable<any> {
    return this._http.get(this.url + 'assignments/' + id);
  }
  saveResponse(response: any ){
    return this._http.post(this.url + 'responses', response)
  }
  createSubQuestions(subQuestions : any){
    return this._http.post(this.url+ 'subQuestions', subQuestions)
  }
}
