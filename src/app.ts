import {inject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

import {EventAggregator} from 'aurelia-event-aggregator';
import {NotificationPayload} from './common/model/notification-payload';

import {PLATFORM} from "aurelia-pal";
import 'bootstrap';

@inject(EventAggregator)
export class App {
  private router: Router;
  private notification1: string;
  private notification2: string;

  constructor(private eventAggregator: EventAggregator) {
    this.eventAggregator.subscribe('anyTopic', (payload: NotificationPayload) => {
      this.notification1 = payload.time;
    });

    this.eventAggregator.subscribe('anyTopic', (payload: NotificationPayload) => {
      this.notification2 = payload.time;
    });
  }

  private clearNotification() {
    this.notification1 = null;
    this.notification2 = null;
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.options.pushState = true; // Removes hashtag on url
    config.map([
      {
        route: ['', 'events'], title: 'Home',name: 'home', nav: true,
        viewPorts: {
          mainContent: { moduleId: PLATFORM.moduleName('components/events/events') },
          sideBar: { moduleId: PLATFORM.moduleName('components/sponsors/sponsors') }
        }
      }, {
        route: 'jobs', title: 'Jobs', name: 'jobs', nav: true,
        viewPorts: {
          mainContent: { moduleId: PLATFORM.moduleName('components/jobs/jobs') },
          sideBar: { moduleId: PLATFORM.moduleName('components/sponsors/sponsors') }
        }
      }, {
        route: 'discussion', title: 'Discussion', name: 'discussion', nav: true,
        viewPorts: {
          mainContent: { moduleId: PLATFORM.moduleName('components/discussion/discussion') },
          sideBar: { moduleId: PLATFORM.moduleName('components/sponsors/sponsors') }
        }
      }, {
        route: "event-detail/:id", name: 'event-detail',
        viewPorts: {
          mainContent: { moduleId: PLATFORM.moduleName('components/events/event-detail') },
          sideBar: { moduleId: PLATFORM.moduleName('components/sponsors/ads') }
        }
      },
      {
        route: 'add-job', name: 'addJob',
        viewPorts: {
          mainContent: { moduleId: PLATFORM.moduleName('components/jobs/add-job') },
          sideBar: { moduleId: PLATFORM.moduleName('components/sponsors/sponsors') }
        }
      }

    ]);


  }
}
