(function(){
  // links
  var categories = [{
    name: 'Development Apps',
    links: [{
      href: '/scm',
      text: 'SCM-Manager'
    }, {
      href: '/jenkins',
      text: 'Jenkins'
    },{
      href: '/nexus',
      text: 'Sonatype Nexus'
    },{
      href: '/sonar',
      text: 'SonarQube'
    },{
      href: '/bugzilla',
      text: 'Bugzilla'
    }]
  },{
    name: 'Administration Apps',
    links: [{
      href: '/universeadm',
      text: 'Universe Administration'
    },{
      href: '/phpmyadmin',
      text: 'phpMyAdmin'
    },{
      href: '/manager',
      text: 'Tomcat Manager'
    },{
      href: '/cas/service',
      text: 'CAS'
    }]
  },{
    name: 'About',
    links: [{
      href: 'https://www.scm-manager.com/contact/',
      text: 'Contact'
    }]
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

  if (!hasClass(body, 'warpmenu-push') && (window === window.top || window.pmaversion)){
    // load css
    addStylesheet('/warp/warp.css');
    addStylesheet('/wp-content/themes/Gravity/resources/css/exo/exo.css');
    addClass(body, 'warpmenu-push');

    // create html
    var nav = document.createElement('nav');
    nav.className = "warpmenu warpmenu-vertical warpmenu-right";
    nav.id = "warpmenu-s1";
    body.appendChild(nav);

    var home = document.createElement('h2');
    var homeLink = document.createElement('a');
    homeLink.href = '/';
    var logo = document.createElement('img');
    logo.src = '/wp-content/uploads/2014/07/UniverseLogo-300x65.png';
    logo.alt = 'SCM-Manager Universe';
    addClass(logo, 'warpmenu-logo');
    homeLink.appendChild(logo);
    home.appendChild(homeLink);
    nav.appendChild(home);

    for (var c=0; c<categories.length; c++){
      var category = categories[c];
      var h3 = document.createElement('h3');
      h3.innerHTML = category.name;
      nav.appendChild(h3);
      var ul = document.createElement('ul');
      for (var i=0; i<category.links.length; i++){
        var link = category.links[i];
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = link.href;
        a.innerHTML = link.text;
        addClass(li, 'warpmenu-link');
        if (i === 0){
          addClass(li, 'warpmenu-link-top');
        }
        li.appendChild(a);
        ul.appendChild(li);
      }
      nav.appendChild(ul);
    }

    var div = document.createElement('div');
    addClass(div, 'warpbtn');
    var a = document.createElement('a');
    addClass(a, 'warpbtn-link');
    div.onclick = function(e){
      toggleNav();
    }
    div.appendChild(a);

    function toggleNav(){
      toggleClass(div, 'warpbtn-open');
      toggleClass(nav, 'warpmenu-open');
      toggleClass(body,'warpmenu-push-toleft');
    }

    // hide menu
    document.onclick = function(e){
      var target = e.target;
      if (hasClass(nav, 'warpmenu-open') && ! hasClass(target, 'warpbtn-link')){
        toggleNav();
      }
    }

    body.appendChild(div);
  }
})();
