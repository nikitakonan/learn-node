// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

Node.prototype.off = window.off = function (name, fn) {
  this.removeEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (
  name,
  fn
) {
  this.forEach((elem) => {
    elem.on(name, fn);
  });
};

NodeList.prototype.off = NodeList.prototype.removeEventListener = function (
  name,
  fn
) {
  this.forEach((elem) => {
    elem.off(name, fn);
  });
};

export { $, $$ };
