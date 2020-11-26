/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
eval("function createCard(e){let t=document.createElement(\"div\");t.className+=\"col-12 col-sm-6 col-lg-4 col-xl-3\";let n=document.createElement(\"div\");n.className+=\"card mb-4\";let o=document.createElement(\"img\");o.setAttribute(\"src\",e.url),o.setAttribute(\"width\",\"500\"),o.setAttribute(\"height\",\"280\"),o.className+=\"card-img-top\",o.setAttribute(\"alt\",\"placeholder\"),n.append(o);let i=document.createElement(\"div\");i.className+=\"card-body\";let r=document.createElement(\"span\");r.textContent=\"Author : \"+e.author,i.append(r);let a=document.createElement(\"p\");a.textContent=\"Last modified : \"+e.updated,i.append(a);let l=document.createElement(\"p\");return l.className+=\"card-text\",l.textContent=\"Description : \"+e.description,i.append(l),n.append(i),t.append(n),t}if(\"serviceWorker\"in navigator?navigator.serviceWorker.register(\"/sw.js\").then(e=>{console.log(\"Votre service worker a été enregistré!\")}).catch(e=>{console.error(e)}):console.warn(\"Service workers are not supported.\"),window.addEventListener(\"offline\",e=>{let t=document.getElementById(\"divOffline\");t.style.visibility=\"visible\"}),window.addEventListener(\"online\",e=>{let t=document.getElementById(\"divOffline\");t.style.visibility=\"hidden\"}),navigator.onLine){let e=document.getElementById(\"divOffline\");e.style.visibility=\"hidden\"}else{let e=document.getElementById(\"divOffline\");e.style.visibility=\"visible\"}var store=localforage.createInstance({name:\"cardDb\"});window.addEventListener(\"DOMContentLoaded\",function(){navigator.onLine?fetch(\"https://compassionate-lichterman-736604.netlify.app/GalerieRepos/index.json\").then(e=>e.json()).then(e=>{store.setItem(\"cards\",e);var t=document.getElementById(\"container\");e.forEach(e=>{let n=createCard(e);t.append(n)}),console.log(\"From fetch\")}):store.getItem(\"cards\").then(function(e){e.forEach(e=>{let t=createCard(e);container.append(t)}),console.log(\"From localforage\")})});\n\n//# sourceURL=webpack://Galerie/./index.js?");
/******/ })()
;