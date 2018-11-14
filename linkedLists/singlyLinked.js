/**
 * Singly linked list can be compared to scavenger hunt.
 * You have a starting point
 * Once you get to a point you get a message that you have reached that pointer
 * and a pointer to the next node.
 * A linked list is just a seried of connected linked nodes
 * We have two types of linked lists:
 * - Singly linked list - linked list where each node has one pointer, i.e to the next node
 * - Doubly linked list - linked list where each node has two pointers, i.e
 *    - one points to the provious node
 *    - the other one points to the mext node
 * The following are operations that can be performed on a linked list
 *    - Retrieve a node
 *    - Add a node
 *    - Delete a node
 *    - Search a node
 */

/**
 * Implementation of a singly linked list in JS
 * We can break down the linked list into; Node, LinkedList
 * Node
 *  - data --> hold a value
 *  - next --> pointer to next node
 *
 * SinglyList
 *   - head
 *   - _length
 *   - add(value)
 *   - remove(position)
 *   - searchNodeAt Position
 *  list = [node0]-> [node1]-> ]node2]-> [node3]
 */

// Node constructor
function Node(data) {
  this.data = data;
  this.next = null;
}

// SinglyList constructor
function SinglyList() {
  this._length = 0;
  this.head = null;
}

// Method to add value to a singly list
SinglyList.prototype.add = function(value) {
  const node = new Node(value);
  currentNode = this.head;

  // Check if it's an empty list
  if (!currentNode) {
    this.head = node; // node becomes the head
    this._length++;
    return node;
  }

  // Check if not empty list
  while (currentNode.next) {
    currentNode = currentNode.next;
  }

  currentNode.next = node;
  this._length++;
  return node;
};

SinglyList.prototype.lengthh = function() {
  length = this._length;
  return this.length;
};

const ls = new SinglyList();
console.log(ls.add(2));
console.log(ls.lengthh());
