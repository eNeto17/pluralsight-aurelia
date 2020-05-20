
import {inject} from 'aurelia-framework';
import {Router, RouterConfiguration, NavigationInstruction} from 'aurelia-router';
import {DataRepository} from "../../services/data-repository";

@inject(DataRepository)
export class Jobs {

  private jobs: any[];
  private router: Router;

  constructor(private dataRepository: DataRepository) {  }

  activate(params: any, routeConfig: RouterConfiguration, navigationInstruction: NavigationInstruction) {
    this.jobs = [];
    this.router = navigationInstruction.router;

    return this.dataRepository.getJobs().then((jobs: any[]) => this.jobs = jobs);
  }

  private addJob() {
    this.router.navigateToRoute("addJob");
  }
}
