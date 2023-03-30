const defColor = "#14a76c";
const checkColor = "#ffe400";
const swapColor = "#ff652f";

const container = document.getElementsByClassName("container2");
const range = document.getElementById("range");
var arr = [];
var arr2 = [];

function generate() {
  arr = [];
  arr2 = [];
  container[0].innerHTML = container[1].innerHTML = "";
  el = range.value;
  w = Math.floor((container[0].offsetWidth - (el - 1) * 4) / el);
  for (let i = 0; i < el; i++) {
    ele = Math.floor(Math.random() * 50) + 10;
    while (arr.includes(ele)) {
      ele = Math.floor(Math.random() * 50) + 10;
    }
    arr[i] = arr2[i] = ele;
    container[0].innerHTML += `<div class="pols" id="a${ele}" style="height:${
      arr[i]
    }vh;width:${w}px;position: absolute;left:${w * i + 4 * i}px;">${
      arr[i]
    }</div>`;
    container[1].innerHTML += `<div class="pols" id="b${ele}" style="height:${
      arr[i]
    }vh;width:${w}px;position: absolute;left:${w * i + 4 * i}px;">${
      arr[i]
    }</div>`;
  }
  var wcal = w * el + (el - 1) * 4 + "px";
  container[0].style.width = container[1].style.width = wcal;
}

class Aswap {
  constructor(c) {
    this.c = c;
  }
  async swap(r1, r2) {
    var p1, p2;
    if (this.c == "a") {
      p1 = document.getElementById(`${this.c}${arr[r1]}`);
      p2 = document.getElementById(`${this.c}${arr[r2]}`);
    } else {
      p1 = document.getElementById(`${this.c}${arr2[r1]}`);
      p2 = document.getElementById(`${this.c}${arr2[r2]}`);
    }
    p1.style.background = p2.style.background = swapColor;

    var ofset1 = p1.offsetLeft;
    var ofset2 = p2.offsetLeft;

    p1.style.left = ofset2 + "px";
    p2.style.left = ofset1 + "px";
    await new Promise((r) => setTimeout(r, 300));
    p1.style.background = p2.style.background = defColor;
  }

  async check(r1, r2) {
    var p1, p2;
    if (this.c == "a") {
      p1 = document.getElementById(`${this.c}${arr[r1]}`);
      p2 = document.getElementById(`${this.c}${arr[r2]}`);
    } else {
      p1 = document.getElementById(`${this.c}${arr2[r1]}`);
      p2 = document.getElementById(`${this.c}${arr2[r2]}`);
    }
    p1.style.background = p2.style.background = checkColor;

    await new Promise((r) => setTimeout(r, 300));
    p1.style.background = p2.style.background = defColor;
  }
}

async function bubbleSort() {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      await obja.check(j, j + 1);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        await obja.swap(j, j + 1);
      }
    }
  }
}

async function selectionSort() {
  for (var i = 0; i < arr2.length; i++) {
    let min = i;
    for (var j = i + 1; j < arr2.length; j++) {
      await objb.check(min, j);
      if (arr2[min] > arr2[j]) {
        min = j;
      }
    }
    if (i != min) {
      [arr2[i], arr2[min]] = [arr2[min], arr2[i]];
      await objb.swap(i, min);
    }
  }
}

var obja = new Aswap("a");
var objb = new Aswap("b");

function start(){
  bubbleSort();
  selectionSort();
}
