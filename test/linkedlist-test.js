/*jshint expr: true*/

var expect = chai.expect;

describe('LinkedList', function() {

    describe('constructor', function() {
        it('should create an empty list', function() {
            var list = new LinkedList();
            expect(list.isEmpty()).to.be.true;
            expect(list.toArray().length).to.equal(0);
        });
    });

    describe('.isEmpty', function() {
        it('should return true for an empty list', function() {
            var list = new LinkedList();
            expect(list.isEmpty()).to.be.true;
        });

        it('should return false for a non-empty list', function() {
            var list = new LinkedList();
            list.add(1);
            expect(list.isEmpty()).to.be.false;
        });
    });

    describe('.isHead', function() {
        it('should return true if the given node is at the head of the list', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3);

            // Find 1
            var node = list.find(function(node) {
                return node.data === 1;
            });
            expect(list.isHead(node)).to.be.true;
        });

        it('should return false if the given node is not at the head of the list', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3);

            // Find 2
            var node = list.find(function(node) {
                return node.data === 2;
            });
            expect(list.isHead(node)).to.be.false;
        });

    });

    describe('.isTail', function() {
        it('should return true if the given node is at the tail of the list', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3);

            // Find 3
            var node = list.find(function(node) {
                return node.data === 3;
            });
            expect(list.isTail(node)).to.be.true;
        });

        it('should return false if the given node is not at the tail of the list', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3);

            // Find 1
            var node = list.find(function(node) {
                return node.data === 1;
            });
            expect(list.isTail(node)).to.be.false;
        });

    });

    describe('.add', function() {
        it('should add elements to the list', function() {
            var list = new LinkedList();

            // Test 1 element list
            list.add(1);
            expect(list.toArray()).to.eql([1]);

            // Test 2 element list
            list.add(2);
            expect(list.toArray()).to.eql([1, 2]);

            // Test 3 element list
            list.add(3);
            expect(list.toArray()).to.eql([1, 2, 3]);

            // Test 4 element list
            list.add(4);
            expect(list.toArray()).to.eql([1, 2, 3, 4]);
        });
    });

    describe('.addBefore', function() {
        it('should add an element before the specified element', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(4);

            // Insert 3 before 4
            var node = list.find(function(node) {
                return node.data === 4;
            });
            list.addBefore(node, 3);

            expect(list.toArray()).to.eql([1, 2, 3, 4]);
        });

        it('should allow adding an element before the head of the list', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3);

            // Insert 0 before 1
            var node = list.find(function(node) {
                return node.data === 1;
            });
            list.addBefore(node, 0);

            expect(list.toArray()).to.eql([0, 1, 2, 3]);
        });
    });

    describe('.addAfter', function() {
        it('should add an element after the specified element', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(4);

            // Insert 3 after 2
            var node = list.find(function(node) {
                return node.data === 2;
            });
            list.addAfter(node, 3);

            expect(list.toArray()).to.eql([1, 2, 3, 4]);
        });
    });

    describe('.remove', function() {
        it('should remove the specified element', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            // Remove 3
            var node = list.find(function(node) {
                return node.data === 3;
            });
            list.remove(node);

            expect(list.toArray()).to.eql([1, 2, 4]);
        });

        it('should allow removing the head of the list', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            // Remove 1
            var node = list.find(function(node) {
                return node.data === 1;
            });
            list.remove(node);

            expect(list.toArray()).to.eql([2, 3, 4]);
        });
    });

    describe('.each', function() {
        it('should iterate over each element', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            var iteratee = function(node) {
                node.data *= 2;
            };

            expect(list.each(iteratee).toArray()).to.eql([2, 4, 6, 8]);
        });

        it('should allow breaking in the middle of an iteration', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            var iteratee = function(node) {
                if (node.data === 3) {
                    return false;
                }
                node.data *= 2;
            };

            expect(list.each(iteratee).toArray()).to.eql([2, 4, 3, 4]);
        });

        it('should allow insertion before head during iteration', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            var data = 0;
            var iteratee = function(node, list) {
                if (node.data > data) {
                    list.addBefore(node, data);
                    return false;
                }
                else if (list.isTail(node)) {
                    list.addAfter(node, data);
                    return false;
                }
            };

            expect(list.each(iteratee).toArray()).to.eql([0, 1, 2, 3, 4]);
        });

        it('should allow insertion in the middle during iteration', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(4).add(5);

            var data = 3;
            var iteratee = function(node, list) {
                if (node.data > data) {
                    list.addBefore(node, data);
                    return false;
                }
                else if (list.isTail(node)) {
                    list.addAfter(node, data);
                    return false;
                }
            };

            expect(list.each(iteratee).toArray()).to.eql([1, 2, 3, 4, 5]);
        });

        it('should allow insertion after the tail during iteration', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            var data = 5;
            var iteratee = function(node, list) {
                if (node.data > data) {
                    list.addBefore(node, data);
                    return false;
                }
                else if (list.isTail(node)) {
                    list.addAfter(node, data);
                    return false;
                }
            };

            expect(list.each(iteratee).toArray()).to.eql([1, 2, 3, 4, 5]);
        });
    });

    describe('.eachInReverse', function() {
        it('should iterate over each element', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            var iteratee = function(node) {
                node.data *= 2;
            };

            expect(list.eachInReverse(iteratee).toArray()).to.eql([2, 4, 6, 8]);
        });

        it('should allow breaking in the middle of an iteration', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            var iteratee = function(node) {
                if (node.data === 2) {
                    return false;
                }
                node.data *= 2;
            };

            expect(list.eachInReverse(iteratee).toArray()).to.eql([1, 2, 6, 8]);
        });

        it('should allow insertion before head during iteration', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            var data = 0;
            var iteratee = function(node, list) {
                if (node.data < data) {
                    list.addAfter(node, data);
                    return false;
                }
                else if (list.isHead(node)) {
                    list.addBefore(node, data);
                    return false;
                }
            };

            expect(list.eachInReverse(iteratee).toArray()).to.eql([0, 1, 2, 3, 4]);
        });

        it('should allow insertion in the middle during iteration', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(4).add(5);

            var data = 3;
            var iteratee = function(node, list) {
                if (node.data < data) {
                    list.addAfter(node, data);
                    return false;
                }
                else if (list.isHead(node)) {
                    list.addBefore(node, data);
                    return false;
                }
            };

            expect(list.eachInReverse(iteratee).toArray()).to.eql([1, 2, 3, 4, 5]);
        });

        it('should allow insertion after the tail during iteration', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            var data = 5;
            var iteratee = function(node, list) {
                if (node.data < data) {
                    list.addAfter(node, data);
                    return false;
                }
                else if (list.isHead(node)) {
                    list.addBefore(node, data);
                    return false;
                }
            };

            expect(list.eachInReverse(iteratee).toArray()).to.eql([1, 2, 3, 4, 5]);
        });
    });

    describe('.find', function() {
        it('should return the first element in the list that matches a condition', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            var predicate = function(node) {
                return node.data === 3;
            };

            expect(list.find(predicate).data).to.equal(3);
        });
    });

    describe('.toArray', function() {
        it('should return an array with data for each node', function() {
            var list = new LinkedList();
            list.add(1).add(2).add(3).add(4);

            expect(list.toArray()).to.eql([1, 2, 3, 4]);
        });
    });
});
