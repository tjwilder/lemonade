var __wpo = {"assets":{"main":["./embedEn.html","./","./fonts/materialdesignicons-webfont.eot","./fonts/materialdesignicons-webfont.svg","./fonts/materialdesignicons-webfont.ttf","./fonts/materialdesignicons-webfont.woff2","./fonts/materialdesignicons-webfont.woff","./fonts/roboto/Roboto-Bold.woff","./fonts/roboto/Roboto-Bold.woff2","./fonts/roboto/Roboto-Light.woff","./fonts/roboto/Roboto-Light.woff2","./fonts/roboto/Roboto-Medium.woff","./fonts/roboto/Roboto-Medium.woff2","./fonts/roboto/Roboto-Regular.woff","./fonts/roboto/Roboto-Regular.woff2","./fonts/roboto/Roboto-Thin.woff","./fonts/roboto/Roboto-Thin.woff2","./bundle.js","./android-chrome-192x192.png","./android-chrome-512x512.png","./favicon-32x32.png","./favicon-16x16.png","./js/materialize.min.js","./js/jquery-3.2.1.min.js","./manifest.json"],"additional":[],"optional":[]},"externals":["./android-chrome-192x192.png","./android-chrome-512x512.png","./favicon-32x32.png","./favicon-16x16.png","./js/materialize.min.js","./js/jquery-3.2.1.min.js","./manifest.json"],"hashesMap":{"e708ae8ae30a083e729d7cc69a34ab2070c6f5e5":"./embedEn.html","20c2951d279befe6f61f82e3123ecdf92c0214d9":"./","02acf9a6077c6fd0ba37b5f16499365bf05eb7c9":"./fonts/materialdesignicons-webfont.eot","f70e244175be4f96a237a748577f28f39dd3c7cb":"./fonts/materialdesignicons-webfont.svg","0d237a357a6428d90612b24e71a74deb9a1b062a":"./fonts/materialdesignicons-webfont.ttf","ae356d6811285df99e5efa432a27a1ae2efb19b5":"./fonts/materialdesignicons-webfont.woff2","5b560e4a95f2e1efea1b4d2b39d9d545b012ca22":"./fonts/materialdesignicons-webfont.woff","e0655b6097eddf9df88cd194eff08436ea086a1c":"./fonts/roboto/Roboto-Bold.woff","5a8465896222227807ff29908d8648db510561a5":"./fonts/roboto/Roboto-Bold.woff2","c7494493f62984e2f581598739b5dd340e9e891b":"./fonts/roboto/Roboto-Light.woff","f6daab924b79b4822dc9faa56bbefe1d1efa3e42":"./fonts/roboto/Roboto-Light.woff2","b17bd60107c9ec0fd8c58a9e1fd222da7f1b99f4":"./fonts/roboto/Roboto-Medium.woff","7c512e2ebddd4dbd08d0f7bfb5b772501f707078":"./fonts/roboto/Roboto-Medium.woff2","6cfb2a5eb3a601ba450dda2d80bacef26c5ba873":"./fonts/roboto/Roboto-Regular.woff","c193deaa915e7183828400922700567900fb6cc3":"./fonts/roboto/Roboto-Regular.woff2","cb8f61464f349af887ba96f6a2ae1e318b3cc8d9":"./fonts/roboto/Roboto-Thin.woff","c321aeb611cf1dcb25717484a4ced717d8ca76fa":"./fonts/roboto/Roboto-Thin.woff2","1658e21a6e25a83a848e49f2fd7d18fcde2018e1":"./bundle.js"},"strategy":"changed","responseStrategy":"cache-first","version":"6/5/2017, 7:31:56 PM","name":"webpack-offline","pluginVersion":"4.8.1","relativePaths":true};

!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var t={};n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=1)}([function(e,n){},function(e,n,t){"use strict";function r(e,n){return caches.match(e,{cacheName:n}).then(function(t){return c()?t:a(t).then(function(t){return caches.open(n).then(function(n){return n.put(e,t)}).then(function(){return t})})}).catch(function(){})}function o(e,n){return e+(-1!==e.indexOf("?")?"&":"?")+"__uncache="+encodeURIComponent(n)}function i(e){return"navigate"===e.mode||e.headers.get("Upgrade-Insecure-Requests")||-1!==(e.headers.get("Accept")||"").indexOf("text/html")}function c(e){return!e||!e.redirected||!e.ok||"opaqueredirect"===e.type}function a(e){return c(e)?Promise.resolve(e):("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status})})}function u(e){return Object.keys(e).reduce(function(n,t){return n[t]=e[t],n},{})}function s(e,n){console.groupCollapsed("[SW]:",e),n.forEach(function(e){console.log("Asset:",e)}),console.groupEnd()}if(function(){var e=ExtendableEvent.prototype.waitUntil,n=FetchEvent.prototype.respondWith,t=new WeakMap;ExtendableEvent.prototype.waitUntil=function(n){var r=this,o=t.get(r);return o?void o.push(Promise.resolve(n)):(o=[Promise.resolve(n)],t.set(r,o),e.call(r,Promise.resolve().then(function e(){var n=o.length;return Promise.all(o.map(function(e){return e.catch(function(){})})).then(function(){return o.length!=n?e():(t.delete(r),Promise.all(o))})})))},FetchEvent.prototype.respondWith=function(e){return this.waitUntil(e),n.call(this,e)}}(),void 0===f)var f=!1;!function(e,n){function t(){if(!S.additional.length)return Promise.resolve();f&&console.log("[SW]:","Caching additional");var e=void 0;return e="changed"===b?l("additional"):c("additional"),e.catch(function(e){console.error("[SW]:","Cache section `additional` failed to load")})}function c(n){var t=S[n];return caches.open(E).then(function(n){return w(n,t,{bust:e.version,request:e.prefetchRequest})}).then(function(){s("Cached assets: "+n,t)}).catch(function(e){throw console.error(e),e})}function l(n){return d().then(function(t){if(!t)return c(n);var r=t[0],o=t[1],i=t[2],a=i.hashmap,u=i.version;if(!i.hashmap||u===e.version)return c(n);var f=Object.keys(a).map(function(e){return a[e]}),l=o.map(function(e){var n=new URL(e.url);return n.search="",n.toString()}),h=S[n],d=[],p=h.filter(function(e){return-1===l.indexOf(e)||-1===f.indexOf(e)});Object.keys(W).forEach(function(e){var n=W[e];if(-1!==h.indexOf(n)&&-1===p.indexOf(n)&&-1===d.indexOf(n)){var t=a[e];t&&-1!==l.indexOf(t)?d.push([t,n]):p.push(n)}}),s("Changed assets: "+n,p),s("Moved assets: "+n,d);var v=Promise.all(d.map(function(e){return r.match(e[0]).then(function(n){return[e[1],n]})}));return caches.open(E).then(function(n){var t=v.then(function(e){return Promise.all(e.map(function(e){return n.put(e[0],e[1])}))});return Promise.all([t,w(n,p,{bust:e.version,request:e.prefetchRequest})])})})}function h(){return caches.keys().then(function(e){var n=e.map(function(e){if(0===e.indexOf(P)&&0!==e.indexOf(E))return console.log("[SW]:","Delete cache:",e),caches.delete(e)});return Promise.all(n)})}function d(){return caches.keys().then(function(e){for(var n=e.length,t=void 0;n--&&(t=e[n],0!==t.indexOf(P)););if(t){var r=void 0;return caches.open(t).then(function(e){return r=e,e.match(new URL(j,location).toString())}).then(function(e){if(e)return Promise.all([r,r.keys(),e.json()])})}})}function p(){return caches.open(E).then(function(n){var t=new Response(JSON.stringify({version:e.version,hashmap:W}));return n.put(new URL(j,location).toString(),t)})}function v(e,n,t){return r(t,E).then(function(r){return r?(f&&console.log("[SW]:","URL ["+t+"]("+n+") from cache"),r):fetch(e.request).then(function(r){return r.ok?(f&&console.log("[SW]:","URL ["+n+"] from network"),t===n&&function(){var t=r.clone(),o=caches.open(E).then(function(e){return e.put(n,t)}).then(function(){console.log("[SW]:","Cache asset: "+n)});e.waitUntil(o)}(),r):(f&&console.log("[SW]:","URL ["+n+"] wrong response: ["+r.status+"] "+r.type),r)})})}function m(e,n,t){return fetch(e.request).then(function(e){if(e.ok)return f&&console.log("[SW]:","URL ["+n+"] from network"),e;throw new Error("Response is not ok")}).catch(function(){return f&&console.log("[SW]:","URL ["+n+"] from cache if possible"),r(t,E)})}function g(e){return e.catch(function(){}).then(function(e){var n=e&&e.ok,t=e&&"opaqueredirect"===e.type;return n||t&&!F?e:(f&&console.log("[SW]:","Loading navigation fallback ["+C+"] from cache"),r(C,E))})}function w(e,n,t){var r=!1!==t.allowLoaders,i=t&&t.bust,c=t.request||{credentials:"omit",mode:"cors"};return Promise.all(n.map(function(e){return i&&(e=o(e,i)),fetch(e,c).then(a)})).then(function(o){if(o.some(function(e){return!e.ok}))return Promise.reject(new Error("Wrong response status"));var i=[],c=o.map(function(t,o){return r&&i.push(y(n[o],t)),e.put(n[o],t)});return i.length?function(){var r=u(t);r.allowLoaders=!1;var o=c;c=Promise.all(i).then(function(t){var i=[].concat.apply([],t);return n.length&&(o=o.concat(w(e,i,r))),Promise.all(o)})}():c=Promise.all(c),c})}function y(e,n){var t=Object.keys(U).map(function(t){if(-1!==U[t].indexOf(e)&&O[t])return O[t](n.clone())}).filter(function(e){return!!e});return Promise.all(t).then(function(e){return[].concat.apply([],e)})}function x(e){var n=e.url,t=new URL(n),r=void 0;r="navigate"===e.mode?"navigate":t.origin===location.origin?"same-origin":"cross-origin";for(var o=0;o<k.length;o++){var i=k[o];if(i&&(!i.requestTypes||-1!==i.requestTypes.indexOf(r))){var c=void 0;if((c="function"==typeof i.match?i.match(t,e):n.replace(i.match,i.to))&&c!==n)return c}}}var O=n.loaders,k=n.cacheMaps,b=e.strategy,R=e.responseStrategy,S=e.assets,U=e.loaders||{},W=e.hashesMap,L=e.externals,P=e.name,q=e.version,E=P+":"+q,j="__offline_webpack__data";!function(){Object.keys(S).forEach(function(e){S[e]=S[e].map(function(e){var n=new URL(e,location);return-1===L.indexOf(e)?n.search="":n.hash="",n.toString()})}),Object.keys(U).forEach(function(e){U[e]=U[e].map(function(e){var n=new URL(e,location);return-1===L.indexOf(e)?n.search="":n.hash="",n.toString()})}),W=Object.keys(W).reduce(function(e,n){var t=new URL(W[n],location);return t.search="",e[n]=t.toString(),e},{}),L=L.map(function(e){var n=new URL(e,location);return n.hash="",n.toString()})}();var _=[].concat(S.main,S.additional,S.optional),C=e.navigateFallbackURL,F=e.navigateFallbackForRedirects;self.addEventListener("install",function(e){console.log("[SW]:","Install event");var n=void 0;n="changed"===b?l("main"):c("main"),e.waitUntil(n)}),self.addEventListener("activate",function(e){console.log("[SW]:","Activate event");var n=t();n=n.then(p),n=n.then(h),n=n.then(function(){if(self.clients&&self.clients.claim)return self.clients.claim()}),e.waitUntil(n)}),self.addEventListener("fetch",function(e){var n=e.request.url,t=new URL(n),r=void 0;-1!==L.indexOf(n)?r=n:(t.search="",r=t.toString());var o="GET"===e.request.method,c=-1!==_.indexOf(r),a=r;if(!c){var u=x(e.request);u&&(a=u,c=!0)}if(!c&&o&&C&&i(e.request))return void e.respondWith(g(fetch(e.request)));if(!c||!o)return void(t.origin!==location.origin&&-1!==navigator.userAgent.indexOf("Firefox/44.")&&e.respondWith(fetch(e.request)));var s=void 0;s="network-first"===R?m(e,r,a):v(e,r,a),C&&i(e.request)&&(s=g(s)),e.respondWith(s)}),self.addEventListener("message",function(e){var n=e.data;if(n)switch(n.action){case"skipWaiting":self.skipWaiting&&self.skipWaiting()}})}(__wpo,{loaders:{},cacheMaps:[]}),e.exports=t(0)}]);