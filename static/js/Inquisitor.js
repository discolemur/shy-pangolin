"use strict";

class RandomQuestionProps {
  constructor(
    casual,
    deeper,
    dating,
    serious,
    engaged,
    married) {
    this.casual = casual;
    this.deeper = deeper;
    this.dating = dating;
    this.serious = serious;
    this.engaged = engaged;
    this.married = married;
  }
  _getLevelIndex(length, preferHigher) {
    let index = length - 1;
    if (!preferHigher) {
      index = Math.floor(Math.random() * length);
      return index;
    }
    const fullWeight = (length * (length + 1)) / 2;
    // Gives integer within [1, (length*length+1)/2] or the sum of all numbers from 1 to the number of levels.
    const weightedValue = Math.floor(Math.random() * fullWeight) + 1;
    // Sum will follow pattern [f(x_i) = f(x_i-1) + x_i] or 1, 3, 6, 10, 15, etc.
    // This means index 1 occurs with weight 1, index 2 with weight 2, etc.
    let sum = 0;
    for (let i = 1; i <= length; i++) {
      sum = sum + i;
      if (sum >= weightedValue) {
        index = i - 1;
        break;
      }
    }
    // console.log(`Random value: ${weightedValue}, Sum: ${sum}, Index: ${index}.`)
    return index;
  }
  getRandomLevel(preferHigher) {
    let opts = [];
    if (this.casual) opts.push("casual");
    if (this.deeper) opts.push("deeper");
    if (this.dating) opts.push("dating");
    if (this.serious) opts.push("serious");
    if (this.engaged) opts.push("engaged");
    if (this.married) opts.push("married");
    return opts[this._getLevelIndex(opts.length, preferHigher)];
  }

}

class Inquisitor {
  constructor(useUnique, preferHigher) {
    this.used = new Set();
    this.useUnique = useUnique;
    this.preferHigher = preferHigher;
  };
  testIt() {
    let p = new RandomQuestionProps(true, false, true, false, false, true);
    let c = 0;
    let d = 0;
    let m = 0;
    let tests = 10000
    for (let i = 0; i < tests; i++) {
      let l = p.getRandomLevel(true);
      if (l == 'casual') { c++; }
      else if (l == 'dating') { d++; }
      else if (l == 'married') { m++; }
      else { console.log(`error ${l}`); }
    }
    console.log(`Casual: ${100.0*c/tests}%, Dating: ${100.0*d/tests}%, Married: ${100.0*m/tests}%.`)
  }
  setUnique(isUnique) {
    this.useUnique = isUnique;
  }
  setPreferHigher(doPrefer) {
    this.preferHigher = doPrefer;
  }
  randomQuestion(questionProps) {
    let options = new Set();
    // this.testIt();
    // First, select a level.
    // Then, select a question.
    // Yes, I know this means levels with fewer questions will have more repeats and that's annoying.
    // But seriously -- implementing a really, truly, random chooser function kind of stinks.
    const level = questionProps.getRandomLevel(this.preferHigher)
    // console.log(level);
    for (let q of questions[level]) {
      if (!this.used.has(q) || !this.useUnique) {
        options.add(q);
      }
    }
    const _qs = Array.from(options);
    const finalQ = _qs.length > 0 ? _qs[Math.floor(Math.random() * _qs.length)] : resources.txt.noQuestions;
    if (finalQ != resources.txt.noQuestions) {
      this.used.add(finalQ);
    }
    return finalQ;
  }
}
