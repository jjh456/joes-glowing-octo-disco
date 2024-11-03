const asyncSortedMerge = require("../solution/async-sorted-merge");

const makeAsyncPop = (items) => {
  return () => new Promise((resolve) => {
    setTimeout(() => {
      resolve(items.pop());
    }, 1);
  });
}

const makeFakeLogSource = (items) => ({
  pop: jest.fn(),
  popAsync: makeAsyncPop(items),
});

describe("Async Sorted Merge", () => {
  test("It should print all of the entries, across all of the sources, in chronological order", async () => {
    const log1 = { date: new Date("2024-01-01"), msg: "foo" };
    const log2 = { date: new Date("2024-01-02"), msg: "bar" };
    const log3 = { date: new Date("2024-01-03"), msg: "baz" };
    const log4 = { date: new Date("2024-01-04"), msg: "foo2" };
    const log5 = { date: new Date("2024-01-05"), msg: "bar2" };
    const log6 = { date: new Date("2024-01-06"), msg: "baz2" };
    const log7 = { date: new Date("2024-01-07"), msg: "foo3" };
    const log8 = { date: new Date("2024-01-08"), msg: "bar3" };
    const log9 = { date: new Date("2024-01-09"), msg: "baz3" };

    const source1 = makeFakeLogSource([log9, log5, log1]);
    const source2 = makeFakeLogSource([log8, log4, log2]);
    const source3 = makeFakeLogSource([log7, log6, log3]);

    const logSources = [source1, source2, source3];

    const printer = {
      print: jest.fn(),
      done: jest.fn(),
    };

    await asyncSortedMerge(logSources, printer);

    expect(printer.print).toHaveBeenCalledTimes(9);

    const printCalls = printer.print.mock.calls;
    expect(printCalls[0][0]).toBe(log1);
    expect(printCalls[1][0]).toBe(log2);
    expect(printCalls[2][0]).toBe(log3);
    expect(printCalls[3][0]).toBe(log4);
    expect(printCalls[4][0]).toBe(log5);
    expect(printCalls[5][0]).toBe(log6);
    expect(printCalls[6][0]).toBe(log7);
    expect(printCalls[7][0]).toBe(log8);
    expect(printCalls[8][0]).toBe(log9);
  });
});