'use strict';

var x = document.getElementById("yuhao");
var y = document.getElementById("i1");

function foo() {
  x.style.color = "blue";
  console.log(x.style.color)
  x.style.color = "red";
  console.log(x.style.color)

  y.value = "yuhao";

  // TODO: Figure out why this doesn't work
  x.dataset.dateOfBirth = '1960-10-03';
  x.dataset.id = 'haha';
}
