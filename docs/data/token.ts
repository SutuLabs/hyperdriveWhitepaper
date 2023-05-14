interface AllocationItem {
  name: string;
  note: string;
  percent?: string;
  getValue: (day: number) => number;
}

function lockAndRelease(day: number, total: number, lockYear: number, releaseYear: number) {
  const linearDay = releaseYear * 12 * 30;
  const perDay = total / linearDay;
  const unlockDay = lockYear * 12 * 30;
  if (day < unlockDay) return 0;
  const unlocked = (day - unlockDay) * perDay;
  if (unlocked > total) return total;
  return unlocked;
}

function minerRelease(day) {
  const initPerDay = 32 * 6 * 24 * 2;
  const quarteringDays = 3 * 12 * 30;
  let remainDays = day;
  let remainPerDay = initPerDay;
  let accu = 0;
  while (remainDays > 0) {
    if (remainDays > quarteringDays) {
      accu += quarteringDays * remainPerDay;
      remainDays -= quarteringDays;
      remainPerDay *= 3 / 4;
    } else {
      accu += remainDays * remainPerDay;
      break;
    }
  }
  return accu;
}

export const allocation: AllocationItem[] = [
  {
    name: "基金会",
    note: "",
    getValue: (day) => lockAndRelease(day, 10000000, 0, 4),
  },
  {
    name: "团队预留",
    note: "锁定一年，之后线性解锁",
    getValue: (day) => lockAndRelease(day, 10000000, 1, 4),
  },
  {
    name: "投资人",
    note: "锁定一年，之后线性解锁",
    getValue: (day) => lockAndRelease(day, 15000000, 1, 2),
  },
  {
    name: "Chia预耕",
    note: "锁定四年",
    getValue: (day) => lockAndRelease(day, 21000000, 4, 4),
  },
  {
    name: "分叉前挖出",
    note: "锁定四年",
    getValue: (day) => lockAndRelease(day, 9000000, 4, 4),
  },
  {
    name: "挖矿",
    note: "线性解锁",
    getValue: minerRelease,
  },
  // {
  //   value: 15000000,
  //   name: "挖矿预留",
  //   note: "",
  // },
];

// const total = allocation.reduce((pv, cv) => pv + cv.value, 0);

// for (let i = 0; i < allocation.length; i++) {
//   const a = allocation[i];
//   a.percent = ((a.value * 100) / total).toFixed(2) + "%";
// }

export default {
  load() {
    return {
      data: {
        allocation,
      },
    };
  },
};
