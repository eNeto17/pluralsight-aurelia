import {BindingSignaler} from 'aurelia-templating-resources';
import {View} from 'aurelia-framework';

let method = 'updateSource';

export class InterceptorBindingBehavior {

  bind(binding: BindingSignaler, scope: View, interceptor: any) {
    // console.log("Binding: ", binding);
    // console.log("Scope: ", scope);
    // console.log("Interceptor: ", interceptor);

    binding[`intercepted-${method}`] = binding[method];
    let update = binding[method].bind(binding);
    binding[method] = interceptor.bind(binding, method, update);

    // console.log("Binding: ", binding);
    // console.log("Update: ", update);
  }

  unbind(binding, scope) {
    // console.log("Un-Binding");
    binding[method] = binding[`intercepted-${method}`];
    binding[`intercepted-${method}`] = null;
  }
}

