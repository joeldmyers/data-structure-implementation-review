/**
 *
 *
 *
 *
 * I will implement this using an array.
 * need to convert keys into valid array indices
 * what makes a good hash - fast, not clustered (distributed evenly), and deterministic (non-random)
 * prime numbers can help avoid collisions
 *
 * ways to deal with collisions
 * separate chaining - linked list or array. in same position.
 *
 * then search for key in the list.
 *
 * linear probing - if there's a collision, look for next empty slot.
 */

class HashTable {
  keyMap: any[];

  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  get(key: string) {
    const index = this._hash(key);

    if (this.keyMap[index]) {
      return this.keyMap[index].filter(
        (item: [string, string]) => item[0] === key
      );
    }
  }
  set(key: string, value: string) {
    const index = this._hash(key);
    this.keyMap[index] = this.keyMap[index] || [];
    this.keyMap[index].push([key, value]);
    return index;
  }

  _hash(key: string) {
    const ARBITRARY_PRIME_NUMBER = 31;
    return (
      key
        .split("")
        .map((val) => val.charCodeAt(0))
        .reduce(
          (prev: number, cur: number) => prev * ARBITRARY_PRIME_NUMBER + cur,
          0
        ) % this.keyMap.length
    );
  }
}

const hashTable = new HashTable();

hashTable.set("Joel", "Myers");

const thingWeWant = hashTable.get("Joel");

console.log("at end", thingWeWant);
