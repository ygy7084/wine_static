export default function listFinder(list, key, input) {
  if (!key || !list) return undefined;
  if (input === '') {
    return list;
  }
  return list.filter((obj) => {
    let temp = obj;
    for (let i = 0; i < key.length; i += 1) {
      if (!temp) break;
      temp = temp[key[i]];
    }
    return temp && String(temp) && String(temp).toUpperCase().indexOf(input.trim().toUpperCase()) > -1;
  });
}
