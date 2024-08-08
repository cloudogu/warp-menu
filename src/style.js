// classie
// https://github.com/desandro/classie


import {head} from "./warp.js";

export function classReg(className) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

export function hasClass(elem, c) {
  return classReg(c).test(elem.className);
}

export function addClass( elem, c ) {
  if ( !hasClass(elem, c) ) {
    elem.className = elem.className + ' ' + c;
  }
}

export function removeClass(elem, c) {
  elem.className = elem.className.replace(classReg( c ), ' ');
}

export function toggleClass(elem, c) {
  var fn = hasClass(elem, c) ? removeClass : addClass;
  fn(elem, c);
}

export function addStylesheet(href, callback, scope){
  // http://thudjs.tumblr.com/post/637855087/stylesheet-onload-or-lack-thereof
  var link = document.createElement('link');
  link.setAttribute('href', href);
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');

  var sheet;
  var cssRules;
  if ( 'sheet' in link ){
    sheet = 'sheet';
    cssRules = 'cssRules';
  } else {
    sheet = 'styleSheet';
    cssRules = 'rules';
  }

  var interval_id = setInterval(function(){
    try {
      if (link[sheet] && link[sheet][cssRules].length){
        clearInterval(interval_id);
        clearTimeout(timeout_id);
        callback.call(scope || window, true, link);
      }
    } catch( e ){}
  }, 10 );
  var timeout_id = setTimeout(function(){
    clearInterval(interval_id);
    clearTimeout( timeout_id );
    head.removeChild(link);
    callback.call(scope || window, false, link);
  }, 15000);

  // make sure warp.css is the first styles applied so it is overrideable
  var otherStyles = document.querySelector('head link[rel="stylesheet"]');
  if (otherStyles) {
    otherStyles.parentNode.insertBefore(link, otherStyles);
  } else {
    head.appendChild(link);
  }
  
  var meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1';

  head.appendChild(meta);

  return link;
}
