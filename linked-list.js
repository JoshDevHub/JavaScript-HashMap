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
}

module.exports = LinkedList;
