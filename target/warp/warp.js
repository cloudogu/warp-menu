!function(){"use strict";function e(e,t){var n=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");return n.open("GET",e),n.onreadystatechange=function(){n.readyState>3&&200==n.status&&t(JSON.parse(n.responseText))},n.setRequestHeader("X-Requested-With","XMLHttpRequest"),n.send(),n}function t(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)")}function n(e,n){return t(n).test(e.className)}function a(e,t){n(e,t)||(e.className=e.className+" "+t)}function r(e,n){e.className=e.className.replace(t(n)," ")}function l(e,t){var l=n(e,t)?r:a;l(e,t)}function o(e,t,n){var a=document.createElement("link");a.setAttribute("href",e),a.setAttribute("rel","stylesheet"),a.setAttribute("type","text/css");var r,l;"sheet"in a?(r="sheet",l="cssRules"):(r="styleSheet",l="rules");var o=setInterval(function(){try{a[r]&&a[r][l].length&&(clearInterval(o),clearTimeout(c),t.call(n||window,!0,a))}catch(e){}},10),c=setTimeout(function(){clearInterval(o),clearTimeout(c),h.removeChild(a),t.call(n||window,!1,a)},15e3);return h.appendChild(a),a}function c(e){return 0===e.indexOf("http")?e:w+e}function p(){var e="__warp";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}}function u(e){return"warpc."+e.Title.toLowerCase().replace(/\s+/g,"_")}function i(e){var t=e.target;if(t&&t.rel){l(t,"warpmenu-category-open");var o=document.getElementById(t.rel);o&&(n(o,"warpmenu-collapsed")?(f&&localStorage.removeItem(t.rel+".collapsed"),r(o,"warpmenu-collapsed")):(f&&localStorage.setItem(t.rel+".collapsed",!0),a(o,"warpmenu-collapsed")))}}function m(e){function t(){l(b,"warpbtn-open"),l(r,"warpmenu-open"),l(v,"warpmenu-push-toleft")}a(v,"warpmenu-push");var r=document.createElement("nav");r.className="warpmenu warpmenu-vertical warpmenu-right",r.id="warpmenu-s1",v.appendChild(r);var o=document.createElement("div");a(o,"warpmenu-home");var p=document.createElement("a");p.target="_top",p.href=c("/");var m=document.createElement("div");a(m,"warpmenu-logo"),p.appendChild(m),o.appendChild(p),r.appendChild(o);for(var d=0;d<e.length;d++){var s=e[d],w=u(s),h=document.createElement("ul");h.id=w;var g=!1;f&&(g=localStorage.getItem(w+".collapsed")),g&&a(h,"warpmenu-collapsed");for(var E=0;E<s.Entries.length;E++){var C=s.Entries[E],T=document.createElement("li"),y=document.createElement("a");y.target=C.Target&&"external"==C.Target?"_blank":"_top",y.href=c(C.Href),y.innerHTML=C.DisplayName,a(T,"warpmenu-link"),0===E&&a(T,"warpmenu-link-top"),T.appendChild(y),h.appendChild(T)}var k=document.createElement("h3");k.rel=w,a(k,"warpbtn-link"),g&&a(k,"warpmenu-category-open"),k.onclick=i,k.innerHTML=s.Title,r.appendChild(k),r.appendChild(h)}var h=document.createElement("ul"),w="warpc.test";h.id=w;var g=!1;f&&(g=localStorage.getItem(w+".collapsed")),g&&a(h,"warpmenu-collapsed");var T=document.createElement("li"),y=document.createElement("a");y.target="_top",y.href=c("https://192.168.115.204/info/index.html"),y.innerHTML="About Cloudogu",a(T,"warpmenu-link"),a(T,"warpmenu-link-top"),T.appendChild(y),h.appendChild(T);var k=document.createElement("h3");k.rel=w,a(k,"warpbtn-link"),g&&a(k,"warpmenu-category-open"),k.onclick=i,k.innerHTML="Information",r.appendChild(k),r.appendChild(h);var b=document.createElement("div");a(b,"warpbtn");var I=document.createElement("a");a(I,"warpbtn-link"),b.onclick=t,b.appendChild(I),document.onclick=function(e){if(e&&e.target){var a=e.target;!n(r,"warpmenu-open")||n(a,"warpbtn-link")||n(a,"warpmenu")||n(a,"warpmenu-home")||t()}},v.appendChild(b)}function d(e){e&&(s=e),--g,0===g&&m(s)}var s,w="",h=document.getElementsByTagName("head")[0],v=document.getElementsByTagName("body")[0],f=p(),g=0;n(v,"warpmenu-push")||self!==top&&!window.pmaversion||(g++,o("/warp/warp.css",function(e){e&&d()}),g++,e("/warp/menu.json",d))}();