import {
  ValidationRenderer,
  RenderInstruction,
  ValidateResult
} from 'aurelia-validation';

export class BootstrapFormRenderer {
  render(instruction: RenderInstruction) {
    for (let { result, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, result);
      }
    }

    for (let { result, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, result);
      }
    }
  }

  add(element: Element, result: ValidateResult) {
    const formGroup = element.closest('.form-group');
    const formControl = element.closest('.form-control');
    if (!formControl) {
      return;
    }

    if (result.valid) {
      if (!formControl.classList.contains('is-invalid')) {
        // Not needed to display green box, just remove invalid style
        // formControl.classList.add('is-valid');
      }
    } else {
      // add the is-invalid class to the enclosing form-group div
      formControl.classList.remove('is-valid');
      formControl.classList.add('is-invalid');

      // add help-block
      const message = document.createElement('span');
      message.className = 'help-block invalid-feedback';
      message.textContent = result.message;
      message.id = `invalid-feedback-${result.id}`;
      formGroup.appendChild(message);
    }
  }

  remove(element: Element, result: ValidateResult) {
    const formGroup = element.closest('.form-group');
    const formControl = element.closest('.form-control');
    if (!formControl) {
      return;
    }

    if (result.valid) {
      if (formControl.classList.contains('is-invalid')) {
        formControl.classList.remove('is-invalid');
      }
    } else {
      // remove help-block
      const message = formGroup.querySelector(`#invalid-feedback-${result.id}`);
      if (message) {
        formGroup.removeChild(message);

        // remove the is-invalid class from the enclosing form-group div
        if (formGroup.querySelectorAll('.help-block.invalid-feedback').length === 0) {
          formGroup.classList.remove('is-invalid');
        }
      }
    }
  }
}

