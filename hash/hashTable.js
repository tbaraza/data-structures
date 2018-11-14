/**
 * Hashing is implemented in two steps
 * An element is converted to an integer using a hash function
 * This will be used as an index to store the original element which
 * falls into the hash table
 * The element is then stored in the hash table
 * When creating hash table using linear probing the following constraints should be followed:
 * The hash index is computed
 * The array is examined starting from the computed hash
 * If that slot is unoccupied then entry record is inserted in the hashed index
 * else it continues in probe sequence until it finds an unoccupied slot.
 * There are no more than length of array elements in the data set.
 * Hash function will return an integer from 0 to length of array - 1.
 * Data set must have unique elements
 * In the code example below we are using Separate chaining (open hashing)
 * which is implemented using linked list
 */
let hash = require("string-hash");

class DumbMap {
  constructor() {
    this.list = [];
  }
  get(x) {
    return this.list[hash(x)];
  }

  set(x, y) {
    this.list[hash(x)] = y;
  }
}

let m = new DumbMap();

m.set("a", 1); // "set a to 1"
console.log(m.get("a")); // "get a"
// separate chining
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = undefined;
    this.prev = undefined;
  }
  
};

class HashTable {
  constructor() {
    this.buckets = [];
    this.maxBucketCount = 100;
  }

  hash(key) {
    const hashCode = hash(key);
    // Adjust to fit within the bucket
    return hashCode % this.maxBucketCount;
  }
  
  put(key, value) {
    const hashCode = this.hash(key);
    let newNode = new Node(key, value)

    // if no element exists in the hash, insert it at that key
    if (this.buckets[hashCode] === undefined) {
      this.buckets[hashCode] = newNode;
    }
    // If an element exist at hash for the given key, but it's the same key
    // overwrite
    if (this.buckets[hashCode].key === key) {
      this.buckets[hashCode].value = value;
      return;
    }

    // If an item exists at the hash but different key
    // then we have a collision
    // Store both the elements in the same linked list.
    let first = this.buckets[hashCode];
    while (first.next !== undefined) {
      first = first.next;
    }
    first.next = newNode;
    newNode.prev = first;
  }

  get(key) {
    const hashCode = this.hash(key);
    if (this.buckets[hashCode] === undefined) {
      return undefined;
    } else if (
      this.buckets[hashCode].next === undefined &&
      this.buckets[hashCode].key === key
    ) {
      return this.buckets[hashCode].value;
    } else {
      let first = this.buckets[hashCode];
      while (
        first !== undefined &&
        first.next !== undefined &&
        first.key !== key
      ) {
        first = first.next;
      }
      if (first.key === key) {
        return first.value;
    } else {
        return undefined;
      }
    }
  }

  delete(key) {
    const hashCode = this.hash(key);

    if (this.buckets[hashCode] === undefined) {
      return undefined;
    } else if (this.buckets[hashCode].next === undefined) {
      this.buckets[hashCode] = undefined;
    } else {
      let first = this.buckets[hashCode];
      while (
        first !== undefined &&
        first.next !== undefined &&
        first.key !== key
      ) {
        first = first.next;q
      }
      let removedValue = first.data;
      // Removing (B)
      // (B) : only item in bucket
      if (first.prev === undefined && first.next === undefined) {
        first = undefined;
        return removedValue;
      }
      // (B) - A - C: start link in bucket
      if (first.prev === undefined && first.next !== undefined) {
        first.data = first.next.data;
        first.key = first.next.key;
        if (first.next.next !== undefined) {
          first.next = first.next.next;
        } else {
          first.next = undefined;
        }
        return removedValue;
      }
      // A - (B) : end link in bucket
      if (first.prev !== undefined && first.next === undefined) {
        first.prev.next = undefined;
        first = undefined;
        return removedValue;
      }
      // A - (B) - C : middle link in bucket
      if (first.prev !== undefined && first.next !== undefined) {
        first.prev.next = first.next;
        first.next.prev = first.prev;
        first = undefined;
        return removedValue;
      }
    }
  }
}
const table = new HashTable();
console.log('put', table.put('key1', 'value1'));
console.log('get', table.get('key1'))

