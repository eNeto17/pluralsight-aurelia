import {inject} from 'aurelia-framework';
import {HttpClient} from "aurelia-http-client";
import {HttpClient as FetchClient, json} from 'aurelia-fetch-client';

import {EventAggregator} from 'aurelia-event-aggregator';
import {NotificationPayload} from '../common/model/notification-payload';

import * as moment from 'moment';

import {EventsData} from './events-data';
import {jobsData, jobSkills, jobTypes, states} from 'services/jobs-data'
import {Event} from "../common/model/event.type";

@inject(HttpClient, FetchClient, 'apiRoot', EventAggregator)
export class DataRepository {
  private eventsData: Event[];

  private readonly jobs: any[];
  private readonly jobSkills: any[];
  private readonly jobTypes: any[];
  private readonly states: any[];


  constructor(private httpClient: HttpClient, private fetchClient: FetchClient,
              private apiRoot: string, private eventAggregator: EventAggregator) {
      this.eventsData = EventsData;
      this.jobs = jobsData;
      this.jobSkills = jobSkills;
      this.jobTypes = jobTypes;
      this.states = states;

      // Trigger a notification after 5 seconds
      setTimeout(() => this.backgroundNotificationReceived(this.eventAggregator), 5000);
  }

  // Publish event from EventAggregator object
  private backgroundNotificationReceived(ea: EventAggregator){
    ea.publish('anyTopic', new NotificationPayload(moment().format("HH:mm:ss")));
  }

  public getEvents(pastFuture: string): Promise<void | Event[]> {
    return this.httpClient.get(this.apiRoot + 'json/events.json')
      .then(response => {
        this.eventsData = response.content;
        this.sortEvents();
        return this.filterEvents(pastFuture);
      })
      .catch(error => console.log("Error getting events: ", error));
  }

  public getEventsFromConstants(pastFuture: string): Promise<Event[]> {
    let promise = new Promise<Event[]>((resolve, reject) => {
      if (!this.eventsData) {
        this.eventsData = EventsData;
      }
      // this.formatEventsTime(); Not needed anymore due to "dateFormat.ts" file
      this.sortEvents();
      setTimeout(() => resolve(this.filterEvents(pastFuture)), 1000); // Just simulate a backend response from 2 seconds
    });
    return promise;
  }

  public getEvent(eventId: number): Event {
    let item = this.eventsData.find(item => item.id == eventId);
    item.isMvp = item.speaker == 'Brian Noyes';
    return item;
  }

  private formatEventsTime() {
    this.eventsData.forEach((item:Event) => {
      item.dateTime = moment(item.dateTime).format("MM/DD/YYYY HH:mm");
    });
  }

  private sortEvents() {
    this.eventsData = this.eventsData.sort((a: Event, b: Event) =>
      moment(a.dateTime).format('YYYYMMDD HH:mm') >= moment(b.dateTime).format('YYYYMMDD HH:mm') ? 1 : -1
    );
  }

  private filterEvents(pastFuture: string): Event[] {
    if (pastFuture == 'past') {
      return this.eventsData.filter((item: Event) => {
        return moment(item.dateTime).isBefore("2015-01-01T22:30:00.000Z");
      })
    }
    if (pastFuture == 'future') {
      return this.eventsData.filter((item: Event) => {
        return moment(item.dateTime).isAfter("2015-01-01T22:30:00.000Z");
      })
    }
    return this.eventsData;
  }

  public getStates() {
    return new Promise((resolve, reject) => resolve(this.states));
  }
  public getJobs(): Promise<any[]> {
    return this.fetchClient.fetch(this.apiRoot + 'json/jobs.json')
      .then(response => response.json())
      .then(data => data);
  }
  public getJobsConstant() {
    return new Promise((resolve, reject) => resolve(this.jobs));
  }
  public getJobTypes() {
    return new Promise((resolve, reject) => resolve(this.jobTypes));
  }
  public getJobSkills() {
    return new Promise((resolve, reject) => resolve(this.jobSkills));
  }

  public addJob(job: any) {
    return new Promise((resolve, reject) => {
      this.jobs.push(job);
      resolve(job);
    });
  }

  public addJobFetch(job: any) {
    this.fetchClient.fetch(this.apiRoot + 'api/jobs', {
      method: 'POST',
      body: json(job)
    })
    .then(response => response.json())
    .then(data => this.eventsData.push(data));
  }

}
