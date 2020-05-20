import {inject} from "aurelia-framework";
import {DataRepository} from "../../services/data-repository";
import {Event} from "../../common/model/event.type";
import {DialogService} from 'aurelia-dialog';
import {EditDialog} from './edit-dialog';

@inject(DataRepository, DialogService)
export class EventDetail {
  private eventDetail: Event;

  constructor(private dataRepository: DataRepository, private dialogService: DialogService) { }

  activate(params: any) {
    this.eventDetail = this.dataRepository.getEvent(params.id);
  }

  editEvent(eventOriginal) {
    let original = JSON.parse(JSON.stringify(eventOriginal));
    this.dialogService.open({viewModel: EditDialog, model: this.eventDetail})
      .whenClosed(response => {
        if (response.wasCancelled) {
          this.eventDetail.title = original.title;
          this.eventDetail.description = original.description;
        } else {
          console.log("Dialog OK");
        }
      });
  }
}
