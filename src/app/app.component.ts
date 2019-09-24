import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserCollection } from './models/user-collection';
import { MbscEventcalendarOptions } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

    events: any;

    eventSettings: MbscEventcalendarOptions = {
        lang: 'fr',
        theme: 'ios',
        display: 'inline',
        view: {
            calendar: { type: 'month' },
            eventList: { type: 'month', scrollable: true }
        }
    };

    ngOnInit() {
        this.http.jsonp('https://trial.mobiscroll.com/events/', 'callback').subscribe((resp: any) => {
            this.events = resp;
        });
    }
}
