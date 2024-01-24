import data from './data';


const dealersAlpha = data.slice();
dealersAlpha.sort((a, b) => a.Title.toLowerCase().localeCompare(b.Title.toLowerCase()));
const dealersAlphaReverse = dealersAlpha.slice();
dealersAlphaReverse.reverse();

const timeAsc = data.slice();
timeAsc.sort((a, b) => a.dateObj > b.dateObj);
const timeDesc = timeAsc.slice();
timeDesc.reverse();

const tagsReducer = (accumulator, current) => {
  current.tags.forEach(tag => {
    accumulator[tag] = accumulator[tag] || 0;
    accumulator[tag] += 1;
  });

  return accumulator;
};

const tags = Object.entries(data.reduce(tagsReducer, {})).map(([name, count]) => ({
  value: name,
  displayName: `${name} (${count})`,
}));
tags.sort((a, b) => a.value.localeCompare(b.value));

export {
  data,
  dealersAlpha,
  dealersAlphaReverse,
  timeAsc,
  timeDesc,
  tags,
};
