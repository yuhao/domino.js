function injectScript(func) {
  var actualCode = '(' + func + ')();'
  var script = document.createElement('script');
  script.textContent = actualCode;
  (document.head || document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}

