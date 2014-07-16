(function(){
  // links
  var links = [{
    href: '/scm',
    text: 'SCM-Manager'
  }, {
    href: '/jenkins',
    text: 'Jenkins'
  },{
    href: '/nexus',
    text: 'Nexus'
  },{
    href: '/sonar',
    text: 'SonarQube'
  },{
    href: '/bugzilla',
    text: 'Bugzilla'
  },{
    href: '/wp-admin',
    text: 'Wordpress'
  }];

  var head = document.getElementsByTagName('head')[0];
  var body = document.getElementsByTagName('body')[0];

  // classie
  // https://github.com/desandro/classie

  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  function hasClass(elem, c) {
    return classReg(c).test(elem.className);
  };

  function addClass( elem, c ) {
    if ( !hasClass(elem, c) ) {
      elem.className = elem.className + ' ' + c;
    }
  };

  function removeClass(elem, c) {
    elem.className = elem.className.replace(classReg( c ), ' ');
  };

  function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
  }

  function addStylesheet(href){
    var alreadExists = false;
    var links = document.getElementsByTagName('link');
    for (var i=0; i<links.length; i++){
      var l = links[i];
      if ( href == l.href ){
        alreadExists = true;
        break;
      }
    }

    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    link.media = 'screen';
    head.appendChild(link);
  }

  if (!hasClass(body, 'cbp-spmenu-push') && window === window.top){
    // load css
    addStylesheet('/inject/inject.css');
    addStylesheet('/wp-content/themes/Gravity/resources/css/exo/exo.css');
    addClass(body, 'cbp-spmenu-push');

    // create html
    var nav = document.createElement('nav');
    nav.className = "cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right";
    nav.id = "cbp-spmenu-s1";
    body.appendChild(nav);

    var home = document.createElement('h3');
    var homeLink = document.createElement('a');
    homeLink.href = '/';
    var logo = document.createElement('img');
    logo.src = '/wp-content/uploads/2014/07/UniverseLogo-300x65.png';
    logo.alt = 'SCM-Manager Universe';
    addClass(logo, 'scmmu-menu-logo');
    homeLink.appendChild(logo);
    home.appendChild(homeLink);
    nav.appendChild(home);

    for (var i=0; i<links.length; i++){
      var link = links[i];
      var a = document.createElement('a');
      a.href = link.href;
      a.innerHTML = link.text;
      nav.appendChild(a);
    }

    var div = document.createElement('div');
    addClass(div, 'scmmu-menu-button');
    var a = document.createElement('a');
    //a.innerHTML = "SCMMU";
    addClass(a, 'scmm-menu-link');
    div.onclick = function(e){
      toggleNav();
    }
    div.appendChild(a);

    function toggleNav(){
      toggleClass(div, 'scmmu-menu-button-open');
      toggleClass(nav, 'cbp-spmenu-open');
      toggleClass(body,'cbp-spmenu-push-toleft');
    }

    // hide menu
    document.onclick = function(e){
      var target = e.target;
      if (hasClass(nav, 'cbp-spmenu-open') && ! hasClass(target, 'scmm-menu-link')){
        toggleNav();
      }
    }

    body.appendChild(div);
  }
})();
