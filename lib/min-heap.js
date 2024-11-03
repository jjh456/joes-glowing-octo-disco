// Array min heap implementation

// I'm also not the biggest fan of classes / OOP,
// but I think it'll lend itself to this well.
// I had to go get a refresher on how heaps work.

// LogItem
// { msg: string, date: Date }

// HeapItem
// { id: number, logItem: LogItem }

module.exports = class LogItemMinHeap {
  constructor() {
    // the null allows us to perform operations on
    // the heap more easily
    this.heap = [null];
  }

  swap(idx1, idx2) {
    const temp = this.heap[idx1];
    this.heap[idx1] = this.heap[idx2];
    if (temp) {
      this.heap[idx2] = temp;
    }
  };

  // this is really just to help with testing and make my life easier
  getHeapArray() { return this.heap; }
  isEmpty() { return this.heap.length === 1; }

  // functions to get the parent, left child, and right child idx of an item
  getParentIdx(idx) { return Math.floor(idx / 2); }
  getLeftChildIdx(idx) { return idx * 2; }
  getRightChildIdx(idx) { return (idx * 2) + 1; }

  // insert the item at the end of the heap and sort it up
  insert(item) {
    this.heap.push(item);
    this.sortIdxUp(this.heap.length - 1);
  }
  // sort items up until its parent is smaller than it or its parent is null
  sortIdxUp(idx) {
    const targetItem = this.heap[idx];
    if (!targetItem) {
      throw new Error("Target item is undefined");
    }

    const parentIdx = this.getParentIdx(idx);
    const parent = this.heap[parentIdx];
    // swap the parent with its target item if its parent isn't null
    // and the target item is an earlier date
    if (parent && parent.logItem.date > targetItem.logItem.date) {
      this.swap(idx, parentIdx);

      // then try bubbling it up again
      this.sortIdxUp(parentIdx);
    }
  }
  // returns the min item or null if the heap is empty
  // and adjusts the heap to keep it evenly distributed
  removeMin() {
    if (this.heap.length === 2) {
      return this.heap.pop();
    } else if (this.heap.length >= 3) {
      const minItem = this.heap[1];
      // pop off the last item and reposition it in the heap
      const finalHeapItem = this.heap.pop();

      this.heap[1] = finalHeapItem;
      this.sortIdxDown(1);

      return minItem;
    } else {
      return null;
    }
  }

  sortIdxDown(idx) {
    const targetItemDate = this.heap[idx]?.logItem.date;
    if (!targetItemDate) {
      throw new Error("Sorting down: Target item is undefined");
    }

    const leftChildIdx = this.getLeftChildIdx(idx);
    const rightChildIdx = this.getRightChildIdx(idx);
    const leftChildDate = this.heap[leftChildIdx]?.logItem.date;
    const rightChildDate = this.heap[rightChildIdx]?.logItem.date;

    const minChildIdx = (() => {
      const noChildren = !leftChildDate && !rightChildDate;
      const leftChildEarlier = leftChildDate && leftChildDate < targetItemDate;
      const rightChildEarlier = rightChildDate && rightChildDate < targetItemDate;
      if (noChildren || (!leftChildEarlier && !rightChildEarlier)) {
        return null;
      } else if (leftChildEarlier && !rightChildEarlier) {
        return leftChildIdx;
      } else if (!leftChildEarlier && rightChildEarlier) {
        return rightChildIdx;
      } else {
        return leftChildDate <= rightChildDate ? leftChildIdx : rightChildIdx;
      }
    })();

    if (minChildIdx !== null) {
      this.swap(idx, minChildIdx);
      this.sortIdxDown(minChildIdx);
    }
  }
}