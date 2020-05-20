import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import {Event} from "../../common/model/event.type";

@inject(DialogController)
export class EditDialog {
  private eventDetail: Event;

	constructor(private dialogController: DialogController) { }

	activate(eventDetail) {
		this.eventDetail = eventDetail;
	}

	save() {
		this.dialogController.ok();
	}

	cancel() {
		this.dialogController.cancel();
	}
}
