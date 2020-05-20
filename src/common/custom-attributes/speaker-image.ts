import {bindable, customAttribute, inject} from 'aurelia-framework';

@inject(Element)
@customAttribute('speaker-img')
export class SpeakerImage {

  @bindable imageName;
  @bindable isMvp;

  constructor(private element: Element) { }

  isMvpChanged(newValue, oldValue) {
    if (newValue) {
      let el = document.createElement("div");
      el.innerHTML = "MVP";
      el.className = "watermark";
      this.element.parentNode.insertBefore(el, this.element.nextSibling)
    }
  }

  imageNameChanged(newValue, oldValue) {
    this.element.setAttribute('src', '../../../images/speakers/' + newValue);

  }
}
