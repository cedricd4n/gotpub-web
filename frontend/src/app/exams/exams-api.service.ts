import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../env';
import { Exam } from './exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamsApiService {

  constructor(private http: HttpClient) {}

  private handleError(err: HttpErrorResponse | any): Observable<never> {
    return throwError(() => 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(`${API_URL}/exams`).pipe(
      catchError(this.handleError)
    );
  }
}