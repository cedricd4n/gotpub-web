import {Component, OnInit, OnDestroy, inject} from '@angular/core';
import {Subscription} from 'rxjs'; // Updated import statement
import {ExamsApiService} from './exams/exams-api.service';
import {Exam} from './exams/exam.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public examsList!: Exam[];

  public examService = inject(ExamsApiService)

  ngOnInit() {
    this.examService
     .getExams()
     .subscribe({
      next: (exams) => this.examsList = exams,
      error: (err) => console.error(err)
     });
  }
}