import {BoundViewFactory, ViewSlot, customAttribute, templateController, inject} from 'aurelia-framework';

@customAttribute('my-if')
@templateController
@inject(BoundViewFactory, ViewSlot)
export class If {
  private showing: boolean;
  private bindingContext: any;

  constructor(private viewFactory: BoundViewFactory, private viewSlot: ViewSlot){
    this.showing = false;
  }

  bind(bindingContext: any) {
    this.bindingContext = bindingContext;
  }

  valueChanged(newValue){
    if (!newValue) {
      if (this["view"]){
        this.viewSlot.remove(this["view"]);
        this["view"].unbind();
      }

      this.showing = false;
      return;
    }

    if (!this["view"]){
      this["view"] = this.viewFactory.create();
    }

    if (!this.showing) {
      this.showing = true;

      if (!this["view"].bound){
        this["view"].bind(this.bindingContext);
      }

      this.viewSlot.add(this["view"]);
    }
  }
}
