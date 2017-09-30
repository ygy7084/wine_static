export default function listFinder(list, option, key, input) {
  console.log('function called');
  const regex = new RegExp(input);
  const found = [];
  const mode = option.find(item => item.name === key);
  if (!mode) return undefined;
  list.forEach((obj) => {
    let temp = obj;
    for (let i = 0; i < mode.key.length; i += 1) {
      if (!temp) break;
      temp = temp[mode.key[i]];
    }
    if (temp && regex.exec(temp)) {
      found.push(obj);
    }
  });
  return found;
}
