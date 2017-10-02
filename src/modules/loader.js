/* global document */
const loader = document.querySelector('#loader');

function on() {
  if (loader.style.display !== 'block') {
    loader.style.display = 'block';
  }
  return null;
}
function off() {
  if (loader.style.display !== 'none') {
    loader.style.display = 'none';
  }
  return null;
}

export default {
  on,
  off,
};
