const LinkedList = require('./linked-list');

class HashMap {
  #buckets;

  constructor() {
    const initialCapacity = 10;

    this.#buckets = Array(initialCapacity);
    this.length = 0;
  }

  #hash(string) {
    const primeNumber = 31;

    let hashCode = 0;
    for (const char of string) {
      hashCode += hashCode * primeNumber + char.charCodeAt();
    }
    return hashCode;
  }

  #hashIndex(key) {
    const index = this.#hash(key) % this.#capacity();
    if (index < 0 || index >= this.#capacity()) {
      throw new Error("Trying to access index out of bound");
    }
    return index;
  }

  #capacity() {
    return this.#buckets.length;
  }
}