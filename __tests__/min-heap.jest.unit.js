const LogItemMinHeap = require("../solution/min-heap.js");

// LogItem
// { msg: string, date: Date }

// HeapItem
// { id: number, logItem: LogItem }

describe("Log Item Min Heap Behaviors", () => {
  // I normally wouldn't write assertions for multiple functions
  // in a single test, but I think it makes sense in this case.
  test("It adjusts the heap array correctly when adding/removing items", () => {
    const heap = new LogItemMinHeap();
    const logItemAt = (position) => heap.getHeapArray()[position]?.logItem;

    // Test insertions
    const heapItem4 = { id: 1, logItem: { msg: "foo", date: new Date("2024-01-04") } };
    heap.insert(heapItem4);
    expect(logItemAt(1)).toBe(heapItem4.logItem);

    const heapItem5 = { id: 2, logItem: { msg: "bar", date: new Date("2024-01-05") } };
    heap.insert(heapItem5);
    expect(logItemAt(1)).toBe(heapItem4.logItem);
    expect(logItemAt(2)).toBe(heapItem5.logItem);

    const heapItem3 = { id: 3, logItem: { msg: "baz", date: new Date("2024-01-03") } };
    heap.insert(heapItem3);
    expect(logItemAt(1)).toBe(heapItem3.logItem);
    expect(logItemAt(2)).toBe(heapItem5.logItem);
    expect(logItemAt(3)).toBe(heapItem4.logItem);

    const heapItem2 = { id: 4, logItem: { msg: "qux", date: new Date("2024-01-02") } };
    heap.insert(heapItem2);
    expect(logItemAt(1)).toBe(heapItem2.logItem);
    expect(logItemAt(2)).toBe(heapItem3.logItem);
    expect(logItemAt(3)).toBe(heapItem4.logItem);
    expect(logItemAt(4)).toBe(heapItem5.logItem);

    const heapItem12 = { id: 5, logItem: { msg: "quux", date: new Date("2024-01-12") } };
    heap.insert(heapItem12);
    const heapItem15 = { id: 6, logItem: { msg: "quuz", date: new Date("2024-01-15") } };
    heap.insert(heapItem15);

    const heapItem18 = { id: 7, logItem: { msg: "corge", date: new Date("2024-01-18") } };
    heap.insert(heapItem18);
    expect(logItemAt(1)).toBe(heapItem2.logItem);
    expect(logItemAt(2)).toBe(heapItem3.logItem);
    expect(logItemAt(3)).toBe(heapItem4.logItem);
    expect(logItemAt(4)).toBe(heapItem5.logItem);
    expect(logItemAt(5)).toBe(heapItem12.logItem);
    expect(logItemAt(6)).toBe(heapItem15.logItem);
    expect(logItemAt(7)).toBe(heapItem18.logItem);

    // Test removals
    let minItem = heap.removeMin();
    expect(minItem).toBe(heapItem2);

    expect(logItemAt(1)).toBe(heapItem3.logItem);
    expect(logItemAt(2)).toBe(heapItem5.logItem);
    expect(logItemAt(3)).toBe(heapItem4.logItem);
    expect(logItemAt(4)).toBe(heapItem18.logItem);
    expect(logItemAt(5)).toBe(heapItem12.logItem);
    expect(logItemAt(6)).toBe(heapItem15.logItem);

    minItem = heap.removeMin();
    expect(minItem).toBe(heapItem3);

    expect(logItemAt(1)).toBe(heapItem4.logItem);
    expect(logItemAt(2)).toBe(heapItem5.logItem);
    expect(logItemAt(3)).toBe(heapItem15.logItem);
    expect(logItemAt(4)).toBe(heapItem18.logItem);
    expect(logItemAt(5)).toBe(heapItem12.logItem);

    minItem = heap.removeMin();
    expect(minItem).toBe(heapItem4);

    expect(logItemAt(1)).toBe(heapItem5.logItem);
    expect(logItemAt(2)).toBe(heapItem12.logItem);
    expect(logItemAt(3)).toBe(heapItem15.logItem);
    expect(logItemAt(4)).toBe(heapItem18.logItem);

    minItem = heap.removeMin();
    expect(minItem).toBe(heapItem5);

    expect(logItemAt(1)).toBe(heapItem12.logItem);
    expect(logItemAt(2)).toBe(heapItem18.logItem);
    expect(logItemAt(3)).toBe(heapItem15.logItem);

    minItem = heap.removeMin();
    expect(minItem).toBe(heapItem12);

    expect(logItemAt(1)).toBe(heapItem15.logItem);
    expect(logItemAt(2)).toBe(heapItem18.logItem);

    minItem = heap.removeMin();
    expect(minItem).toBe(heapItem15);

    expect(logItemAt(1)).toBe(heapItem18.logItem);
    expect(heap.isEmpty()).toBeFalsy();

    minItem = heap.removeMin();
    expect(minItem).toBe(heapItem18);
    expect(heap.getHeapArray()).toEqual([null]);
    expect(heap.isEmpty()).toBeTruthy();
  });
});