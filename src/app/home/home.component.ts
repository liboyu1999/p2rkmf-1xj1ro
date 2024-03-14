import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  template: `
    <section class="form-container">
      <form [formGroup]="retirementForm" class="retirement-form">
        <div class="form-field">
          <label for="currentAge">Current Age:</label>
          <input id="currentAge" type="number" formControlName="currentAge">
        </div>

        <div class="form-field">
          <label for="lifeExpectancy">Life Expectancy:</label>
          <input id="lifeExpectancy" type="number" formControlName="lifeExpectancy">
        </div>

        <div class="form-field">
          <label for="retirementAge">Retirement Age:</label>
          <input id="retirementAge" type="number" formControlName="retirementAge">
        </div>

        <div class="form-field">
          <label for="earnings">Average Indexed Monthly Earnings:</label>
          <input id="earnings" type="number" formControlName="averageIndexedMonthlyEarnings">
        </div>

        <div class="form-field">
          <label for="returnOnInvestment">Return on Investment (%):</label>
          <input id="returnOnInvestment" type="number" formControlName="returnOnInvestment">
        </div>

        <div class="form-field">
          <label for="marriageStatus">Marriage Status:</label>
          <select id="marriageStatus" formControlName="marriageStatus">
            <option value="0">Single</option>
            <option value="1">Married</option>
          </select>
        </div>

        <button (click)="checkHealth()" type="button" class="primary">Check Health</button>
      </form>
    </section>
  `,
  styles: [
    `
      .form-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .retirement-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
      .form-field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      label {
        margin-bottom: 5px;
      }
      input, select {
        padding: 8px;
        width: 100%;
        box-sizing: border-box;
      }
      button.primary {
        padding: 10px 20px;
        cursor: pointer;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  retirementForm: FormGroup;

  constructor(private http: HttpClient) {
    this.retirementForm = new FormGroup({
      currentAge: new FormControl('', Validators.required),
      lifeExpectancy: new FormControl('', Validators.required),
      retirementAge: new FormControl('', Validators.required),
      averageIndexedMonthlyEarnings: new FormControl('', Validators.required),
      returnOnInvestment: new FormControl('', Validators.required),
      marriageStatus: new FormControl('0', Validators.required),
    });
  }

  ngOnInit(): void {
    // You can optionally call checkHealth here if needed
  }

  checkHealth(): void {
    console.log('Checking health...'); // Confirm method is being called
    this.http
      .get('https://kmytkxbdd5.execute-api.us-east-2.amazonaws.com/health', {
        responseType: 'text',
      })
      .subscribe({
        next: (response) => {
          // Assuming the response is a simple text or JSON. Adjust parsing as needed.
          console.log('Health Check Success:', response);
          try {
            const jsonResponse = JSON.parse(response);
            console.log('Parsed JSON Response:', jsonResponse);
          } catch (error) {
            console.log('Response is not JSON, raw response:', response);
          }
        },
        error: (error) => {
          console.error('Health Check Failed:', error);
        },
      });
  }
}
