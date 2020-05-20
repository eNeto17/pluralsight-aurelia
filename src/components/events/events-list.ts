import {inject} from 'aurelia-framework';
import {Router, RouteConfig, activationStrategy} from 'aurelia-router';

import {Event} from "../../common/model/event.type";
import {DataRepository} from "../../services/data-repository";

@inject(DataRepository, Router)
export class EventsList {
  private events: Event[];

  constructor(private dataRepository: DataRepository, private router: Router) { }

  activate(params: any, routeConfig: RouteConfig) {
    this.dataRepository.getEvents(routeConfig.name)
      .then((response: Event[]) => {
        this.addEventDetailUrl(response);
        this.events = params.speaker ? this.filterEvents(params.speaker, response) : response;
      });
  }

  determineActivationStrategy() {
    return activationStrategy.invokeLifecycle;
  }

  private addEventDetailUrl(events: Event[]) {
    events.forEach((eventItem: Event) => {
      // Setting url detail "dynamically"
      eventItem.detailUrl = this.router.generate('event-detail', {id: eventItem.id});
    });
  }

  private filterEvents(speaker: string, events: Event[]): Event[] {
    return events.filter((item: Event) => item.speaker.toLowerCase().indexOf(speaker.toLowerCase()) >= 0);
  }


}
