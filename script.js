const defColor = "#14a76c";
const checkColor = "#ffe400";
const swapColor = "#ff652f";
const container = document.getElementById("container");
const range = document.getElementById("range");
// const pol = document.getElementsByClassName("pols");
var arr = [];
function generate() {
  arr = [];
  container.innerHTML = "";
  el = range.value;
  w = Math.floor((container.offsetWidth - (el - 1) * 4) / el);
  for (let i = 0; i < el; i++) {
    ele = Math.floor(Math.random() * 50) + 10;
    while (arr.includes(ele)) {
      ele = Math.floor(Math.random() * 50) + 10;
    }
    arr[i] = ele;
    container.innerHTML += `<div class="pols" id="${ele}" style="height:${
      arr[i]
    }vh;width:${w}px;position: absolute;left:${w * i + 4 * i}px;">${
      arr[i]
    }</div>`;
  }
  container.style.width = w * el + (el - 1) * 4 + "px";
}

async function swap(r1, r2) {
  // function swap() {
  //   r1 = Math.floor(Math.random() * (arr.length-1));
  //   r2 = Math.floor(Math.random() * (arr.length-1));
  //   while (r1==r2){
  //     r2 = Math.floor(Math.random() * (arr.length-1));
  //   }

  var temp = arr[r1];
  arr[r1] = arr[r2];
  arr[r2] = temp;

  p1 = document.getElementById(`${arr[r1]}`);
  p2 = document.getElementById(`${arr[r2]}`);
  p1.style.background = swapColor;
  p2.style.background = swapColor;
  ofset1 = p1.offsetLeft;
  ofset2 = p2.offsetLeft;

  p1.style.left = ofset2 + "px";
  p2.style.left = ofset1 + "px";
  await new Promise((r) => setTimeout(r, 300));
  p1.style.background = defColor;
  p2.style.background = defColor;
}

async function check(r1, r2) {
  p1 = document.getElementById(`${arr[r1]}`);
  p2 = document.getElementById(`${arr[r2]}`);
  p1.style.background = checkColor;
  p2.style.background = checkColor;
  await new Promise((r) => setTimeout(r, 300));
  p1.style.background = defColor;
  p2.style.background = defColor;
}

async function bubbleSort() {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      await check(j, j + 1);
      if (arr[j] > arr[j + 1]) {
        await swap(j, j + 1);
      }
    }
  }
}

async function selectionSort() {
  for (var i = 0; i < arr.length; i++) {
    let min = i;
    for (var j = i + 1; j < arr.length; j++) {
      await check(min, j);
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    if (i != min) {
      await swap(i, min);
      // [arr[ i ],arr[min]]= [arr[min],arr[ i ]];
    }
  }
  return arr;
}
