
import {inject} from 'aurelia-framework';
import {ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';
import {Router, RouterConfiguration, NavigationInstruction} from 'aurelia-router';

import {DataRepository} from '../../services/data-repository';
import {BootstrapFormRenderer} from '../../common/bootstrap-renderer/bootstrap-form-renderer';


@inject(DataRepository, ValidationController)
export class AddJob {

  private readonly job: any;
  private states: any[];
  private jobTypes: any[];
  private jobSkills: any[];

  private router: Router;

  constructor(private dataRepository: DataRepository, private validationController: ValidationController) {
    this.job = { jobType: "Full Time", jobSkills: []};
    this.dataRepository.getStates().then((states:any[]) => this.states = states);
    this.dataRepository.getJobTypes().then((jobTypes:any[]) => this.jobTypes = jobTypes);
    this.dataRepository.getJobSkills().then((jobSkills:any[]) => this.jobSkills = jobSkills);

    // Setting trigger event to launch validations rules on form
    this.validationController.validateTrigger = validateTrigger.change;

    // Custom bootstrap styles to fields and display messages
    this.validationController.addRenderer(new BootstrapFormRenderer());

    // Create a custom rule
    ValidationRules.customRule(
      'notCEO', // Rule name to be used on ValidationRules
      (value,object) => value !== 'CEO',
      `nice try, \${$displayName} cannot be \${$value}`
    );

    ValidationRules
      .ensure((j:any) => j.title)
      .required()
      .minLength(3)
      .satisfiesRule('notCEO')
      .on(this.job);
  }

  activate(params: any, routeConfig: RouterConfiguration, navigationInstruction: NavigationInstruction) {
    this.router = navigationInstruction.router;
  }

  save() {
    // Before save check if there are errors
    if (this.validationController.errors && this.validationController.errors.length > 0) {
      console.log("Errors on form, can't save...");
      return;
    }


    if (this.job.needDate) {
      this.job.needDate = new Date(this.job.needDate);
    }
    this.dataRepository.addJob(this.job).then(job => this.router.navigateToRoute('jobs'));
  }
}
