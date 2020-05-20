import {Router, RouterConfiguration} from "aurelia-router";
import {PLATFORM} from "aurelia-pal";

export class Events {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.title = 'Events';
    config.options.pushState = true; // Removes hashtag on url

    config.map([
      { route: ['', 'future'], title: 'Future Events', nav: true, name: 'future',
        moduleId: PLATFORM.moduleName('components/events/events-list') },
      { route: 'past', title: 'Past Events', nav: true, href: '/events/past', name: 'past',
        moduleId: PLATFORM.moduleName('components/events/events-list') }
    ]);
  }
}
