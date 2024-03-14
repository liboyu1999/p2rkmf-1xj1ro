import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-health-check',
  standalone: true,
  templateUrl: './health-check.component.html',
  styleUrls: ['./health-check.component.css'],
})
export class HealthCheckComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.checkHealth();
  }

  checkHealth(): void {
    this.http
      .get('https://kmytkxbdd5.execute-api.us-east-2.amazonaws.com/health')
      .subscribe({
        next: (response) => {
          console.log('Health Check Response:', response);
          // Process the response here
        },
        error: (error) => {
          console.error('Health Check Error:', error);
          // Handle error here
        },
      });
  }
}
