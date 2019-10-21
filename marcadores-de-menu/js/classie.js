( function( window ) {

'use strict';

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

(function() {
  [].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
    var menuItems = menu.querySelectorAll('.menu__link'),
      setCurrent = function(ev) {
        ev.preventDefault();

        var item = ev.target.parentNode; // li

        // return if already current
        if (classie.has(item, 'menu__item--current')) {
          return false;
        }
        // remove current
        classie.remove(menu.querySelector('.menu__item--current'), 'menu__item--current');
        // set current
        classie.add(item, 'menu__item--current');
      };

    [].slice.call(menuItems).forEach(function(el) {
      el.addEventListener('click', setCurrent);
    });
  });

  
})(window);