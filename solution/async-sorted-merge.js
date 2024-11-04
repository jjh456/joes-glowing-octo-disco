"use strict";
const LogItemMinHeap = require("./min-heap");
const CachedLogSource = require("./cached-log-source");

// Print all entries, across all of the *async* sources, in chronological order.
// This async solution is not as performant as the sync solution.
// It waits on each source to finish popping before moving on, and that delay is
// the reason for the slowdown.

module.exports = async (logSources, printer) => {
  // Create a map obj for the next entry for each source. The key is the source's index, 
  // and the value is the next entry from that source.
  const logMinHeap = new LogItemMinHeap();
  const makeMinHeapItem = (entry, sourceIndex) =>
    ({ logItem: entry, id: sourceIndex });

  const cacheSources = logSources.map(source => new CachedLogSource(source));

  // Populate the heap with the first log item from each source.
  const entries = await Promise.all(cacheSources.map(source => source.popAsync()));
  entries.forEach((entry, i) => {
    if (entry) {
      logMinHeap.insert(makeMinHeapItem(entry, i));
    }
  });

  while (!logMinHeap.isEmpty()) {
    // Find the earliest logItem.
    const earliestHeapItem = logMinHeap.removeMin();

    // Print the earliest logItem.
    printer.print(earliestHeapItem.logItem);

    // Get the next logItem from the same source.
    const nextEntryFromSameSource = await cacheSources[earliestHeapItem.id].popAsync();

    if (nextEntryFromSameSource) {
      const nextHeapItem = makeMinHeapItem(nextEntryFromSameSource, earliestHeapItem.id);
      logMinHeap.insert(nextHeapItem, earliestHeapItem.id);
    }
  }

  printer.done();
  console.log("Async sort complete.");
};
