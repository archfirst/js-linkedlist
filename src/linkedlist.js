// -----------------------------------------------------------------------------
// ListNode
// -----------------------------------------------------------------------------
function ListNode(data) {
    this.data = data;
    // this.next = null;
    // this.prev = null;
}

ListNode.prototype.toString = function() {
    return '{prev: ' + this.prev.data +
            ', this: ' + this.data +
            ', next: ' + this.next.data +
            '}';
};

// -----------------------------------------------------------------------------
// LinkedList
// -----------------------------------------------------------------------------
function LinkedList() {
    this.head = null;
}

/**
 * Returns true if list is empty, otherwise false
 * @returns {boolean}
 */
LinkedList.prototype.isEmpty = function() {
    return this.head === null;
};

/**
 * Returns true is the given node is the head of the list, otherwise false
 * @param {ListNode} node
 * @returns {boolean}
 */
LinkedList.prototype.isHead = function(node) {
    return this.head === node;
};

/**
 * Returns true is the given node is the tail of the list, otherwise false
 * @param {ListNode} node
 * @returns {boolean}
 */
LinkedList.prototype.isTail = function(node) {
    return this.head.prev === node;
};

/**
 * Adds a new node at the end of the linked list.
 * Returns the list for chaining.
 *
 * @param {*} data
 * @returns {LinkedList} this
 */
LinkedList.prototype.add = function(data) {

    var node = new ListNode(data);

    if (this.head === null) {
        node.next = node;
        node.prev = node;
        this.head = node;
    }
    else {
        var tail = this.head.prev;

        // Connect the new node
        node.next = this.head;
        node.prev = tail;

        // Make the current tail point to the new node
        tail.next = node;

        // Make the head's prev point to the new node
        this.head.prev = node;
    }

    return this;
};

/**
 * Adds a new node before the given node.
 * Returns the list for chaining.
 *
 * @param {ListNode} node
 * @param {*} data
 * @returns {LinkedList} this
 */
LinkedList.prototype.addBefore = function(node, data) {

    var newNode = new ListNode(data);
    var prevNode = node.prev;

    // Connect the new node
    newNode.next = node;
    newNode.prev = prevNode;

    // Make prevNode point to newNode
    prevNode.next = newNode;

    // Make node point to newNode
    node.prev = newNode;

    // If node is head, then adjust head to newNode
    if (node === this.head) {
        this.head = newNode;
    }

    return this;
};

/**
 * Adds a new node after the given node.
 * Returns the list for chaining.
 *
 * @param {ListNode} node
 * @param {*} data
 * @returns {LinkedList} this
 */
LinkedList.prototype.addAfter = function(node, data) {

    var newNode = new ListNode(data);
    var nextNode = node.next;

    // Connect the new node
    newNode.next = nextNode;
    newNode.prev = node;

    // Make nextNode point to newNode
    nextNode.prev = newNode;

    // Make node point to newNode
    node.next = newNode;

    return this;
};

/**
 * Removes the given node from the list.
 *
 * @param {ListNode} node
 * @returns {LinkedList}
 */
LinkedList.prototype.remove = function(node) {

    // Get references to next and prev
    var prev = node.prev;
    var next = node.next;

    // Handle special case of head pointing to node
    if (this.head === node) {
        // If this is the only node in the list, make head point to null
        if (next === prev) {
            this.head = null;
        }
        else {
            this.head = next;
        }
    }

    // Make prev point to next
    prev.next = next;

    // Make next point to prev
    next.prev = prev;

    return this;
};

/**
 * Iterates over the list and calls the iteratee function for each node.
 * Each invocation of iteratee is called with two arguments: (node, list).
 * Iteratee functions may exit iteration early by explicitly returning false.
 * The state of the iterator is undefined if the list is modified during iteration.
 * If you modify the list during iteration, you must exit the iteration immediately.
 * Returns the list for chaining.
 *
 * @callback iteratee
 * @returns {LinkedList} this
 */
LinkedList.prototype.each = function(iteratee) {
    var next = (this.head) ? this.head : null;
    while (next !== null) {
        if (iteratee(next, this) === false) {
            return this;
        }

        next = next.next;
        if (next === this.head) {
            next = null;
        }
    }

    return this;
};

/**
 * Iterates over the list in the reverse direction and calls the iteratee function for each node.
 * Each invocation of iteratee is called with two arguments: (node, list).
 * Iteratee functions may exit iteration early by explicitly returning false.
 * The state of the iterator is undefined if the list is modified during iteration.
 * If you modify the list during iteration, you must exit the iteration immediately.
 * Returns the list for chaining.
 *
 * @callback iteratee
 * @returns {eachInReverse}
 */
LinkedList.prototype.eachInReverse = function(iteratee) {
    var prev = (this.head) ? this.head.prev : null;
    while (prev !== null) {
        if (iteratee(prev, this) === false) {
            return this;
        }

        prev = prev.prev;
        if (prev === this.head.prev) {
            prev = null;
        }
    }

    return this;
};

/**
 * Looks through each node in the list, returning the first one that passes
 * a truth test (predicate), or undefined if no value passes the test.
 * Each invocation of predicate is called with two arguments: (node, list).
 * The function returns as soon as it finds an acceptable element, and doesn't
 * traverse the entire list.
 *
 * @callback predicate
 * @returns {ListNode | undefined}
 */
LinkedList.prototype.find = function(predicate) {
    var next = (this.head) ? this.head : null;
    while (next !== null) {
        if (predicate(next, this)) {
            return next;
        }

        next = next.next;
        if (next === this.head) {
            next = null;
        }
    }
};

/**
 * Returns an array with data for each element.
 *
 * @returns {Array}
 */
LinkedList.prototype.toArray = function() {
    var result = [];
    this.each(function(node) {
        result.push(node.data);
    });
    return result;
};
