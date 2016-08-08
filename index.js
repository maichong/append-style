/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-08
 * @author Liang <liang@maichong.it>
 */

'use strict';

var styles = {};

var propMap = {
  bg: 'background',
  bgi: 'background-image',
  w: 'width',
  h: 'height',
  t: 'top',
  l: 'left',
  b: 'bottom',
  r: 'right',
  m: 'margin',
  mt: 'margin-top',
  mr: 'margin-right',
  mb: 'margin-bottom',
  ml: 'margin-right',
  p: 'padding',
  pt: 'padding-top',
  pr: 'padding-right',
  pb: 'padding-bottom',
  pl: 'padding-left'
};
var defaultPx = ['width', 'height', 'top', 'left', 'bottom', 'right', 'font-size'];

function selectorToId(selector) {
  return selector.replace(/\s+/g, '-').replace(/#/g, '_');
}

function propName(key) {
  if (!propMap[key]) {
    propMap[key] = key.replace(/[A-Z]/g, function (match) {
      return '-' + match.toLowerCase();
    });
  }
  return propMap[key];
}

function style(selector, css) {
  selector = selector.replace(/\s+/g, ' ');
  var id = selectorToId(selector);
  var item = styles[id];
  if (!item) {
    var dom = document.createElement('style');
    dom.setAttribute('id', id);
    item = {
      dom: dom,
      style: {}
    };
    document.head.appendChild(dom);
    styles[id] = item;
  }

  for (var key in css) {
    var name = propName(key);
    var value = css[key];
    if (/\d+/.test(value) && defaultPx.indexOf(name) > -1) {
      value += 'px';
    }
    item.style[name] = value;
  }

  var text = selector + '{';
  for (var i in item.style) {
    text += i + ':' + item.style[i] + ';';
  }
  text += '}';
  item.dom.textContent = text;
}

style.remove = function (selector) {
  var id = selectorToId(selector);
  if (styles[id]) {
    styles[id].dom.remove();
    delete styles[id];
  }
};

module.exports = style.default = style;
