const LinkedList = require('./linked-list');

const INITIAL_CAPACITY = 10;

class HashMap {
  #buckets;

  constructor() {
    this.#buckets = Array(INITIAL_CAPACITY);
    this.length = 0;
  }

  get(key) {
    const keyIndex = this.#hashIndex(key);
    const entry = this.#buckets[keyIndex]?.find(key);

    return entry?.value;
  }

  set(key, value) {
    const keyIndex = this.#hashIndex(key);

    this.#buckets[keyIndex] ||= new LinkedList();
    const entry = this.#buckets[keyIndex].find(key);

    if (entry) {
      entry.value = value;
      return;
    }

    if (this.#hasHighLoadFactor()) {
      this.#growCapacity();
      this.set(key, value);
      return;
    }

    this.#buckets[keyIndex].push(key, value);
    this.length++;
  }

  has(key) {
    const entry = this.get(key);
    if (entry) {
      return true;
    }
    return false;
  }

  remove(key) {
    const keyIndex = this.#hashIndex(key);
    const bucket = this.#buckets[keyIndex];

    if (!bucket) return;

    return bucket.remove(key);
  }

  clear() {
    this.#buckets = Array(INITIAL_CAPACITY);
    this.length = 0;
  }

  entries() {
    return this.#toArray(({ key, value }) => [key, value]);
  }

  keys() {
    return this.#toArray((entry) => entry.key);
  }

  #toArray(callback) {
    return this.#buckets.reduce((array, bucket) => {
      if (!bucket) return array;

      bucket.each((entry) => array.push(callback(entry)));
      return array;
    }, []);
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

  #growCapacity() {
    const currentEntries = this.entries();
    this.#buckets = Array(this.#capacity() * 2);
    currentEntries.forEach(([key, value]) => this.set(key, value));
  }

  #loadFactor() {
    return this.length / this.#capacity();
  }

  #hasHighLoadFactor() {
    return this.#loadFactor() > 0.75;
  }
}
