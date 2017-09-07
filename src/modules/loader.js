/* global document */
const loader = document.querySelector('#loader');

function on() {
  loader.style.display = 'block';
  console.log(loader.style.display);
}
function off() {
  loader.style.display = 'none';
}

export default {
  on,
  off,
};
