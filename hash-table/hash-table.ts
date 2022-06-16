class HashTable {
  // I will implement this using an array.
  // need to convert keys into valid array indices
  // what makes a good hash - fast, not clustered (distributed evenly), and deterministic (non-random)

  hash(key: string, arrayLength = 10) {
    return (
      key
        .split("")
        .map((val) => val.charCodeAt(0))
        .reduce((prev: number, cur: number) => prev + cur, 0) % arrayLength
    );
  }
}

const hashTable = new HashTable();

console.log(hashTable.hash("foo"));
