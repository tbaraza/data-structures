const hash = require("string-hash");

class HashTable {
  constructor() {
      this.buckets = Array(100).fill(null);
  }

  hash(key) {
    const hashCode = hash(key);

    return hashCode % this.buckets.length;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    // start from the computed hash
      if (this.buckets[hashCode]) {
          // collission, probe for some space in next indices
          for(let i = hashCode; i < this.buckets.length; i++) {
             // If an element exist at hash for the given key, but it's the same key
              // overwrite
              if (this.buckets[i].key === key) {
                  // we're replacing
                  this.buckets[i] = { key, value }
                  return
              }


              if (!this.buckets[i]) {
                  // we've found empty slot, so it did not exist. create new one
                  this.buckets[i] = { key, value }
                  return
              }
          }

          // if we reach here then it means we've used all slots > initial index, need to resize then save
          const prevLength = this.buckets.length;
          this.buckets.length += 50;
          for (let i = prevLength - 1; i < this.buckets.length; i++) {
              this.buckets[i] = null;
          }
          this.buckets[prevLength - 1] = { key, value };
      } else {
          this.buckets[hashCode] = { key, value };
      }
  }

  get(key) {
      const hashCode = this.hash(key)

      for (let i = hashCode; i < this.buckets.length; i++) {
          if (this.buckets[i]) {
              if (this.buckets[i].key === key) {
                  return this.buckets[i].value
              }
          } else {
              return undefined
          }
      }
  }

  delete(key) {
      const hashCode = this.hash(key)

      let deletedhashCode;
      for (let i = hashCode; i < this.buckets.length; i++) {
          if (this.buckets[i]) {
              if (this.buckets[i].key === key) {
                  this.buckets[i] = null
                  deletedhashCode = i
              } else if (deletedhashCode && this.hash(this.buckets[i].key) <= deletedhashCode) {
                  this.buckets[deletedhashCode] = this.buckets[i]
                  this.buckets[i] = null
                  deletedhashCode = i
              }
          } else {
              return
          }
      }
  }
}

const table = new HashTable()

table.set("key1", "value1")
table.set("key2", "value2")

console.log(table.get("key1"));

table.set("key1", "newValue1")

console.log(table.get("key1"));
console.log(table.get("key2"));
console.log(table.get("key3"));

table.delete("key1")

console.log(table.get("key1"));