import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import axios from "axios";
import * as moment from "moment";

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.css']
})
export class AddTimesheetComponent implements OnInit {
  addTimesheetForm: FormGroup;
  duration = {
    hours: 0,
    minutes: 0
  };
  valid = {
    title: true,
    date: true,
    startTime: true,
    endTime: true,
    workType:true,
    client: true
  };
  clients = [{_id: 'null', name: 'getting clients...'}];

  constructor() { }

  ngOnInit() {
    this.getClients();
    this.addTimesheetForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      startTime: new FormControl(null, Validators.required),
      endTime: new FormControl(null, Validators.required),
      workType: new FormControl(null, Validators.required),
      client: new FormControl(null, Validators.required),
      comments: new FormControl(null)
    })
    this.addTimesheetForm.valueChanges.subscribe((value) => {
      let duration = this.getDuration(value);
      this.duration = {
        hours: duration['_data']['hours'],
        minutes: duration['_data']['minutes']
      };
    })
  }

  getClients() {
    axios.get(`${environment.api.baseUrl}${environment.api.getClients}`).then((resp) => {
      this.clients = resp.data
      console.log(this.clients)
    })
  }

  getDuration(value) {
    let startDateTime = moment(`${value.date} ${value.startTime}`, "YYYY-MM-DD HH:mm");
    let endDateTime = moment(`${value.date} ${value.endTime}`, "YYYY-MM-DD HH:mm");

    let duration = moment.duration(endDateTime.diff(startDateTime))
    console.log(duration)
    return duration
  }

  getDateTimeString(date, time=null) {
    let dateTime = moment();
    if (time == null) {
      dateTime = moment(`${date}`, "YYYY-MM-DD");
    } else {
      dateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
    }
    return dateTime.utc().toISOString();
  }

  onSubmit() {
    this.valid = {
      title: this.addTimesheetForm.get('title').valid,
      date: this.addTimesheetForm.get('date').valid,
      startTime: this.addTimesheetForm.get('startTime').valid,
      workType: this.addTimesheetForm.get('workType').valid,
      client: this.addTimesheetForm.get('client').valid,
      endTime: this.addTimesheetForm.get('endTime').valid
    }

    if (this.addTimesheetForm.valid) {
      let payload = {
        workTitle: this.addTimesheetForm.value.title,
        date: this.getDateTimeString(this.addTimesheetForm.value.date),
        startTime: this.getDateTimeString(this.addTimesheetForm.value.date, this.addTimesheetForm.value.startTime),
        endTime: this.getDateTimeString(this.addTimesheetForm.value.date, this.addTimesheetForm.value.endTime),
        workType: this.addTimesheetForm.value.workType,
        client: this.addTimesheetForm.value.client,
        comments: this.addTimesheetForm.value.comments,
      }
      axios.post(`${environment.api.baseUrl}${environment.api.postTimesheet}`, payload,{
        headers: {'x-auth': localStorage.getItem('token')}
      }).then((resp) => {
        alert('Timesheet saved! ID: ' + resp.data.data.id)
      }).catch((err) => {
        alert('There was an error saving your timesheet! Please try again later.')
      })
      console.log(payload)
    }
  }

}
