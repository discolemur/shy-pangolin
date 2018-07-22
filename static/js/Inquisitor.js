"use strict";

class Inquisitor {

  constructor() {
  };
  randomQuestion(props) {
    let _qs = [];
    for (let prop of Object.keys(props)) {
      if (props[prop]) {
        _qs = _qs.concat(questions[prop]);
      }
    }
    return _qs[Math.floor(Math.random()*_qs.length)];
  }

}
