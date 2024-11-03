"use strict";
const LogItemMinHeap = require("../lib/min-heap");

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  // Create a map obj for the next entry for each source. The key is the source's index, 
  // and the value is the next entry from that source.
  const logMinHeap = new LogItemMinHeap();
  const makeMinHeapItem = (entry, sourceIndex) =>
    ({ logItem: entry, id: sourceIndex });


  // Populate the heap with the first log item from each source.
  for (let i = 0; i < logSources.length; i++) {
    const logSource = logSources[i];
    const nextEntry = logSource.pop();
    if (nextEntry) {
      logMinHeap.insert(makeMinHeapItem(nextEntry, i));
    }
  }

  while (!logMinHeap.isEmpty()) {
    // Find the earliest logItem
    const earliestHeapItem = logMinHeap.removeMin();

    // Print the earliest logItem.
    printer.print(earliestHeapItem.logItem);

    // Get the next logItem from the same source.
    const nextEntryFromSameSource = logSources[earliestHeapItem.id].pop();
    if (nextEntryFromSameSource) {
      const nextHeapItem = makeMinHeapItem(nextEntryFromSameSource, earliestHeapItem.id);
      logMinHeap.insert(nextHeapItem, earliestHeapItem.id);
    }
  }

  return console.log("Sync sort complete.");
};
