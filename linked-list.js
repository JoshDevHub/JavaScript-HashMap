class ListNode {
  constructor(key, value, next = null) {
    this.entry = { key, value };
    this.next = next;
  }
}

class LinkedList {
  #head;
  #tail;

  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  push(key, value) {
    const newNode = new ListNode(key, value);
    if (this.#head) {
      this.#tail.nextNode = newNode;
    } else {
      this.#head = newNode;
    }

    this.#tail = newNode;
  }

  find(key) {
    let pointer = this.#head;
    while(pointer) {
      if (pointer.entry.key === key) return pointer.entry;

      pointer = pointer.nextNode;
    }
    return null;
  }

  remove(key) {
    if (this.#head.entry.key === key) {
      const out = this.#head.entry.value;
      this.#head = this.#head.nextNode;
      return out;
    }

    let pointer = this.#head;

    while (pointer.nextNode) {
      const potentialTarget = pointer.nextNode;
      if (potentialTarget.entry.key === key) {
        pointer.nextNode = potentialTarget.nextNode;
        return potentialTarget.entry.value;
      }
      pointer = pointer.nextNode;
    }
  }

  each(callback) {
    let pointer = this.#head;
    while (pointer) {
      callback(pointer.entry);
      pointer = pointer.nextNode;
    }
  }
}

module.exports = LinkedList;
