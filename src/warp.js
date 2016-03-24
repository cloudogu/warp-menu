(function(){

  // model
  var model = {
    baseUrl: '',
    home: {
      href: '/',
      logo: {
        src: '/wp-content/uploads/2014/07/UniverseLogo-300x65.png',
        alt: 'SCM-Manager Universe'
      }
    },
    categories: [{
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
        text: 'User Management'
      },{
        href: '/phpmyadmin',
        text: 'phpMyAdmin'
      },{
        href: '/manager',
        text: 'Tomcat Manager'
      }]
    },{
      name: 'About',
      links: [{
        href: 'https://www.scm-manager.com/contact/',
        text: 'Contact',
        target: '_blank'
      }]
    }]
  };

  var head = document.getElementsByTagName('head')[0];
  var body = document.getElementsByTagName('body')[0];

  var lss = isLocalStorageSupported();

  // create link
  function createLink(href){
    if (href.indexOf('http') === 0){
      return href;
    } else {
      return model.baseUrl + href;
    }
  }

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

  // http://stackoverflow.com/questions/11214404/how-to-detect-if-browser-supports-html5-local-storage
  function isLocalStorageSupported(){
    var mod = '__warp';
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch(e){
      return false;
    }
  }

  function getCategoryKey(category){
    return "warpc." + category.name.toLowerCase().replace(/\s+/g, "_");
  }

  function toggleCategory(e){
    var target = e.target;
    if (target && target.rel){
      toggleClass(target, 'warpmenu-category-open');
      var el = document.getElementById(target.rel);
      if (el){
        if (hasClass(el, 'warpmenu-collapsed')){
          if (lss){
            localStorage.removeItem(target.rel + '.collapsed');
          }
          removeClass(el, 'warpmenu-collapsed');
        } else {
          if (lss){
            localStorage.setItem(target.rel + '.collapsed', true);
          }
          addClass(el, 'warpmenu-collapsed');
        }
      }
    }
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
    homeLink.href = createLink(model.home.href);
    var logo = document.createElement('div');
    addClass(logo, 'warpmenu-logo');
    homeLink.appendChild(logo);
    home.appendChild(homeLink);
    nav.appendChild(home);

    for (var c=0; c<model.categories.length; c++){
      var category = model.categories[c];
      var id = getCategoryKey(category);
      var ul = document.createElement('ul');
      ul.id = id;
      var collapsed = false;
      if (lss){
        collapsed = localStorage.getItem(id + '.collapsed');
      }
      if (collapsed){
        addClass(ul, 'warpmenu-collapsed');
      }
      for (var i=0; i<category.links.length; i++){
        var link = category.links[i];
        var li = document.createElement('li');
        var a = document.createElement('a');
        if (link.target){
          a.target = link.target;
        } else {
          a.target = '_top';
        }
        a.href = createLink(link.href);
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
      if (collapsed){
        addClass(h3, 'warpmenu-category-open');
      }
      h3.onclick = toggleCategory;
      h3.innerHTML = category.name;
      nav.appendChild(h3);

      nav.appendChild(ul);
    }

    var div = document.createElement('div');
    addClass(div, 'warpbtn');
    var btn = document.createElement('a');
    addClass(btn, 'warpbtn-link');

    function toggleNav(){
      toggleClass(div, 'warpbtn-open');
      toggleClass(nav, 'warpmenu-open');
      toggleClass(body,'warpmenu-push-toleft');
    }

    div.onclick = toggleNav;
    div.appendChild(btn);

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
        urls: [createLink('/wp-content/themes/Gravity/resources/css/exo/exo.css')]
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
