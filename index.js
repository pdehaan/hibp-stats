#!/usr/bin/env node

const lib = require("./lib");

const argv = process.argv.slice(2);

main(...argv);

async function main(maxBreaches = 20) {
  const breaches = await lib.getBreaches();

  const dataClasses = breaches.reduce((acc, curr) => {
    if (curr.DataClasses) {
      curr.DataClasses.forEach(cls => {
        const arr = acc.get(cls) || [];
        arr.push(curr.PwnCount);
        acc.set(cls, arr);
      });
    }
    return acc;
  }, new Map());

  const res = [...dataClasses]
    .map(([dataClass, pwnCount]) => {
      const breachCount = pwnCount.length;
      const breachPct = (breachCount / breaches.length) * 100;
      const totalPwnCount = pwnCount.reduce(sum, 0);
      return {
        dataClass,
        breachCount,
        breachPct,
        pwnCount: totalPwnCount
      };
    })
    .sort((itemA, itemB) => itemB.pwnCount - itemA.pwnCount);

  res.slice(0, maxBreaches)
    .forEach((stats, idx) => {
      console.log(
        `${String(idx + 1).padStart(String(maxBreaches).length, " ")}. ${stats.dataClass.padEnd(
          30,
          " "
        )} ${stats.pwnCount.toLocaleString().padStart(16, " ")} (${
          stats.breachCount
        } of ${breaches.length} -- ${stats.breachPct.toFixed(1)}%)`
      );
    });
}

function sum(acc, value) {
  return acc + value;
}
