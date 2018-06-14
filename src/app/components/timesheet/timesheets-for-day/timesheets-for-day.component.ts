import { Component, OnInit } from '@angular/core';
import { environment } from "./../../../../environments/environment"; 
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheets-for-day',
  templateUrl: './timesheets-for-day.component.html',
  styleUrls: ['./timesheets-for-day.component.css']
})
export class TimesheetsForDayComponent implements OnInit {
  timesheets = []

  constructor(public router: Router) { }

  addTimesheet() {
    this.router.navigate(["dashboard"])
  }

  ngOnInit() {
    axios.get(`${environment.api.baseUrl}${environment.api.timesheets}`, {
      headers: {
        "x-auth": localStorage.getItem('token')
      }
    })
      .then((resp) => {
        this.timesheets = resp.data;
      }).catch((e) => {
        alert("There was an error fetching data.")
      })
  }

}
