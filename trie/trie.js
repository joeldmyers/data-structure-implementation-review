class TrieNode {
  constructor() {
    this.keys = new Map();
    this.end = false;
  }

  setEnd() {
    this.end = true;
  }

  isEnd() {
    return this.end;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  add(input, node = this.root) {
    if (input.length === 0) {
      node.setEnd();
    } else if (!node.keys.has(input[0])) {
      // create a new node with this letter if it isn't already in there
      node.keys.set(input[0], new Node());
    } else {
      // if it's already in the trie we don't need to add it so we just
      // continue with the rest.
      return this.add(input.substr(1), node.keys.get(input[0]));
    }
  }

  isWord(word) {
    let node = this.root;
    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false;
      } else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      }
    }

    return node.keys.has(word) && node.keys.get(word).isEnd();
  }

  print() {
    let words = new Array();
    let search = function (node, string) {
      if (node.keys.size !== 0) {
        for (let letter of node.keys.kes()) {
          search(node.keys.get(letter), string.concat(letter));
        }

        if (node.isEnd()) {
          words.push(string);
        }
      } else {
        if (string.length) {
          words.push(string);
          return;
        }
      }
    };
    search(this.root, new String());
    return words?.length || null;
  }
}
