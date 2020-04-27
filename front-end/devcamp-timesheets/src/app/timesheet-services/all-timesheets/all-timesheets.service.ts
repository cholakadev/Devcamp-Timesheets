import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ITimesheet} from 'src/app/interfaces/timesheet';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';
import {IWeek} from '../../interfaces/week';
import {IProjects, ITaskSelectOption} from '../../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class AllTimesheetsService {
  private _BASE_URL = environment.timesheets.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  loadTimesheets(): Observable<ITimesheet[]> {
    return this.httpClient
      .get<ITimesheet[]>(`${this._BASE_URL}/timesheets/all`);
  }

  getTimesheetById(id: number): Observable<ITimesheet> {
    return this.httpClient
      .get<ITimesheet>(`${this._BASE_URL}/timesheets/${id}`);
  }

  deleteTimesheet(id: number): Observable<any> {
    return this.httpClient
      // .get<any>(this._BASE_URL + '/timesheets/' + 1);
      .delete<any>(this._BASE_URL + '/timesheets/' + id);
  }

  createTimesheet(timesheet: { start_date: string }): Observable<ITimesheet> {
    return this.httpClient
      .post<ITimesheet>(this._BASE_URL + '/timesheets/create', timesheet);
  }

  getWeeks(): Observable<IWeek[]> {
    return this.httpClient
      .get<any>(this._BASE_URL + '/timesheets/create');
  }

  getProjects(): Observable<IProjects[]> {
    return this.httpClient
      .get<IProjects[]>(this._BASE_URL + '/projects');
  }

  getProjectById(id: number): Observable<any> {
    return this.httpClient
      .get<any>(this._BASE_URL + '/projects/' + id);
  }

  submitTimesheet(id: number) {
    return this.httpClient
      .post<any>(this._BASE_URL + '/timesheets/' + id + '/submit', {});
  }

  // login(): Observable<any> {
  //   const params = {
  //     csrfmiddlewaretoken: 'T9W3K3OkEFJD2zAps47tq9nCH86dr0Vq88YncODoj9UuyKOWDfpjusplgtnspvTC',
  //     username: 'admin',
  //     password: 'password123'
  //   };
  //
  //   return this.httpClient
  //     .get<any>('http://127.0.0.1:8000/admin/login/');
  // }
}
