export default function (object, keyArr) {
  let value = undefined;
  if (
    !object || typeof object !== 'object' ||
    !keyArr || typeof keyArr !== 'object' || !keyArr.length
  ) {
    return value;
  }
  value = object;
  for (let i = 0; i < keyArr.length; i += 1) {
    value = value[keyArr[i]];
    if (!value) {
      return value;
    }
  }
  return value;
}
