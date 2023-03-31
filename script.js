const defColor = "#14a76c";
const checkColor = "#ffe400";
const swapColor = "#ff652f";

const container = document.getElementsByClassName("container2");
const range = document.getElementById("range");
const sorts1 = document.getElementById("sorts1");
const sorts2 = document.getElementById("sorts2");
const s1 = document.getElementById("s1");
const s2 = document.getElementById("s2");
var obja, objb;

function generate() {
  obja = new Aswap("a");
  objb = new Aswap("b");
  container[0].innerHTML = container[1].innerHTML = "";
  el = range.value;
  w = Math.floor((container[0].offsetWidth - (el - 1) * 4) / el);
  for (let i = 0; i < el; i++) {
    ele = Math.floor(Math.random() * 50) + 10;
    while (obja.arr.includes(ele)) {
      ele = Math.floor(Math.random() * 50) + 10;
    }
    obja.arr[i] = objb.arr[i] = ele;
    container[0].innerHTML += `<div class="pols" id="${obja.c}${ele}" style="height:${
      obja.arr[i]}vh;width:${w}px;left:${w * i + 4 * i}px;">${obja.arr[i]}</div>`;
    container[1].innerHTML += `<div class="pols" id="${objb.c}${ele}" style="height:${
      objb.arr[i]}vh;width:${w}px;left:${w * i + 4 * i}px;">${objb.arr[i]}</div>`;
  }
  let wcal = w * el + (el - 1) * 4 + "px";
  container[0].style.width = container[1].style.width = wcal;
}

class Aswap {
  arr = [];
  constructor(c) {
    this.c = c;
  }
  async swap(r1, r2) {
    let p1 = document.getElementById(`${this.c}${this.arr[r1]}`);
    let p2 = document.getElementById(`${this.c}${this.arr[r2]}`);

    p1.style.background = p2.style.background = swapColor;

    let ofset1 = p1.offsetLeft;
    let ofset2 = p2.offsetLeft;

    p1.style.left = ofset2 + "px";
    p2.style.left = ofset1 + "px";

    await new Promise((r) => setTimeout(r, 300));
    p1.style.background = p2.style.background = defColor;
  }

  async check(r1, r2) {
    let p1 = document.getElementById(`${this.c}${this.arr[r1]}`);
    let p2 = document.getElementById(`${this.c}${this.arr[r2]}`);

    p1.style.background = p2.style.background = checkColor;

    await new Promise((r) => setTimeout(r, 300));
    p1.style.background = p2.style.background = defColor;
  }

  async bubbleSort() {
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr.length - i - 1; j++) {
        if (this.arr[j] > this.arr[j + 1]) {
          [this.arr[j], this.arr[j + 1]] = [this.arr[j + 1], this.arr[j]];
          await this.swap(j, j + 1);
        } else {
          await this.check(j, j + 1);
        }
      }
    }
  }

  async selectionSort() {
    for (let i = 0; i < this.arr.length; i++) {
      let min = i;
      for (let j = i + 1; j < this.arr.length; j++) {
        await this.check(min, j);
        if (this.arr[min] > this.arr[j]) {
          min = j;
        }
      }
      if (i != min) {
        [this.arr[i], this.arr[min]] = [this.arr[min], this.arr[i]];
        await this.swap(i, min);
      }
    }
  }

  async insertionSort() {
    let j;
    for (let i = 1; i < this.arr.length; i++) {
      j = i - 1;
      await this.check(j, j + 1);
      while (j >= 0 && this.arr[j] > this.arr[j + 1]) {
        [this.arr[j], this.arr[j + 1]] = [this.arr[j + 1], this.arr[j]];
        await this.swap(j, j + 1);
        j -= 1;
      }
    }
  }
}

function startSorting() {
  let sort1 = sorts1.value;
  let sort2 = sorts2.value;

  if(sort1=='bubble'){
    obja.bubbleSort();
  }else if(sort1=='selection'){
    obja.selectionSort();
  }else if(sort1=='insertion'){
    obja.insertionSort();
  }else{
    console.log('wtf - a !!!')
  }

  if(sort2=='bubble'){
    objb.bubbleSort();
  }else if(sort2=='selection'){
    objb.selectionSort();
  }else if(sort2=='insertion'){
    objb.insertionSort();
  }else{
    console.log('wtf - b !!!')
  }
}
