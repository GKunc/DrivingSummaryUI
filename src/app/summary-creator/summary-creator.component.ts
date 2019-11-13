import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-summary-creator-component',
  templateUrl: './summary-creator.component.html'
})
export class SummaryCreatorComponent {

  private http;
  private baseUrl;
  public startDate;
  private email;

  constructor(router: Router, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.http = http;
      this.baseUrl = baseUrl;
      this.startDate = new Date();
      this.email = "";
  }
}


