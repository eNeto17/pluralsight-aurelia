
export class Sponsors {

  constructor() { }

  myinterceptor(method, update, value) {
    console.log(value);
    update(value);
  }
}
