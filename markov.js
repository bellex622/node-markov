/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {

    const chains = {};
    for (let i = 0; i < this.words.length; i++) {
      if (!(this.words[i] in chains)) {
        chains[this.words[i]] = [this.words[i + 1] || null] ;
      }
      else {
        chains[this.words[i]].push(this.words[i + 1] || null);
      }
    }

    return chains;


  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let text = this.words[0];
    let subString = this.words[0];
    while (subString !== null) {
      let key = subString;
      // console.log("the key is", key);
      let selectedIdx = Math.floor(Math.random() * this.chains[key].length);
      subString = this.chains[key][selectedIdx];
      if (subString !== null) text += (" " + subString);
    }

    return text;


  }
}


module.exports = {
  MarkovMachine,
};

