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
      text: 'Contact',
      target: '_blank'
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
  }

  function addClass( elem, c ) {
    if ( !hasClass(elem, c) ) {
      elem.className = elem.className + ' ' + c;
    }
  }

  function removeClass(elem, c) {
    elem.className = elem.className.replace(classReg( c ), ' ');
  }

  function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
  }

  function addStylesheet(href, callback, scope){
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

    head.appendChild( link );

    return link;
  }

  function initWarpMenu(){
    addClass(body, 'warpmenu-push');

    // create html
    var nav = document.createElement('nav');
    nav.className = "warpmenu warpmenu-vertical warpmenu-right";
    nav.id = "warpmenu-s1";
    body.appendChild(nav);

    var home = document.createElement('div');
	addClass(home, 'warpmenu-home');
    var homeLink = document.createElement('a');
    homeLink.target = '_top';
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
      var id = 'warp_c_' + c;
      var ul = document.createElement('ul');
      ul.id = id;
      for (var i=0; i<category.links.length; i++){
        var link = category.links[i];
        var li = document.createElement('li');
        var a = document.createElement('a');
        if (link.target){
          a.target = link.target;
        } else {
          a.target = '_top';
        }
        a.href = link.href;
        a.innerHTML = link.text;
        addClass(li, 'warpmenu-link');
        if (i === 0){
          addClass(li, 'warpmenu-link-top');
        }
        li.appendChild(a);
        ul.appendChild(li);
      }

      var h3 = document.createElement('h3');
	  h3.rel = id;
      addClass(h3, 'warpbtn-link');
      h3.onclick = function(e){
        var target = e.target;
        if (target && target.rel){
		  toggleClass(target, 'warpmenu-category-open');
          var el = document.getElementById(target.rel);
          if (el){
            toggleClass(el, 'warpmenu-collapsed');
          }
        }
      };
      h3.innerHTML = category.name;
      nav.appendChild(h3);

      nav.appendChild(ul);
    }

    var div = document.createElement('div');
    addClass(div, 'warpbtn');
    var btn = document.createElement('a');
    addClass(btn, 'warpbtn-link');
    div.onclick = function(e){
      toggleNav();
    };
    div.appendChild(btn);

    function toggleNav(){
      toggleClass(div, 'warpbtn-open');
      toggleClass(nav, 'warpmenu-open');
      toggleClass(body,'warpmenu-push-toleft');
    }

    // hide menu
    document.onclick = function(e){
      if (e && e.target){
        var target = e.target;
		// TODO define marker class to stop menu from collapsing
        if (hasClass(nav, 'warpmenu-open') && ! hasClass(target, 'warpbtn-link') && ! hasClass(target, 'warpmenu') && ! hasClass(target, 'warpmenu-home')){
          toggleNav();
        }
      }
    };

    body.appendChild(div);
  }

  if (!hasClass(body, 'warpmenu-push') && (self === top || window.pmaversion)){

    WebFont.load({
      custom: {
        families: ['Exo::latin'],
        urls: [ '/wp-content/themes/Gravity/resources/css/exo/exo.css' ]
      }
    });

    // load css
    addStylesheet('/warp/warp.css', function(success){
      if (success){
        initWarpMenu();
      }
    });
  }
  
})();
