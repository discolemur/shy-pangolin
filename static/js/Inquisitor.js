"use strict";

class Inquisitor {

  constructor(useUnique = false, preferHigher = false) {
    this.used = new Set();
    this.useUnique = useUnique;
    this.preferHigher = preferHigher;
  };
  setUnique(isUnique) {
    this.useUnique = isUnique;
  }
  setPreferHigher(doPrefer) {
    this.preferHigher = doPrefer;
  }
  // TODO: implement prefer higher
  randomQuestion(props) {
    let options = new Set();
    for (let prop of Object.keys(props)) {
      if (props[prop]) {
        for (let q of questions[prop]) {
          if ((this.useUnique && !this.used.has(q)) || !this.useUnique) {
            options.add(q);
          }
        }
      }
    }
    const _qs = Array.from(options);
    const finalQ = _qs.length > 0 ? _qs[Math.floor(Math.random()*_qs.length)] : resources.txt.noQuestions;
    this.used.add(finalQ);
    return finalQ;
  }
}
