import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
/*
var COLOR_MAP = {
  "--m-red": "#FC354C",
  "--m-blue-dark": "#13747D",
  "--m-blue-light": "#0ABFBC",
  "--m-black": "#29221F",
  "--background-light": "#FCF7C5",
};

(function(){
  var css = `:root{${Object.entries(COLOR_MAP).map(e=>`${e[0]}:${e[1]}`)}};`,
      head = document.head || document.getElementsByTagName('head')[0],
      scriptTag = document.createElement('style');
  scriptTag.type = 'text/css';
  if (scriptTag.styleSheet){
    scriptTag.styleSheet.cssText = css;
  } else {
    scriptTag.appendChild(document.createTextNode(css));
  }
  head.appendChild(scriptTag);
})();
*/
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
