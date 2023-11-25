const LinkedList = require('./linked-list');

class HashMap {
  #buckets;

  constructor() {
    const initialCapacity = 10;

    this.#buckets = Array(initialCapacity);
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

  entries() {
    return this.#buckets.reduce((collection, bucket) => {
      if (!bucket) return collection;

      bucket.each(({ key, value }) => collection.push([key, value]));
      return collection;
    }, [])
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
