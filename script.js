const defColor = "#14a76c";
const checkColor = "#ffe400";
const swapColor = "#ff652f";

const container = document.getElementsByClassName("container2");
const range = document.getElementById("range");
const sorts1 = document.getElementById("sorts1");
const sorts2 = document.getElementById("sorts2");
var obja, objb;

function rangevalue(x) {
  document.getElementById("rangev").innerHTML = x;
}

function generate() {
  obja = new Aswap("a");
  objb = new Aswap("b");

  obja.checkScore.innerHTML = obja.swapScore.innerHTML = objb.checkScore.innerHTML = objb.swapScore.innerHTML = 0;
  container[0].innerHTML = container[1].innerHTML = "";

  let el = range.value;
  let w = Math.floor((container[0].offsetWidth - (el - 1) * 4) / el);

  for (let i = 0; i < el; i++) {
    let rano = Math.floor(Math.random() * 50) + 10;
    obja.arr[i] = new Polls(i, w, rano, 0);
    objb.arr[i] = new Polls(i, w, rano, 1);
  }
  container[0].style.width = container[1].style.width = w * el + (el - 1) * 4 + "px";
}

class Polls {
  constructor(i, w, rano, cno) {
    this.no = rano;
    this.xpos = w * i + 4 * i;
    this.div = document.createElement("div");

    this.div.classList.add("pols");
    this.div.style.height = `${this.no}vh`;
    this.div.style.width = `${w}px`;
    this.div.style.left = `${this.xpos}px`;
    this.div.textContent = this.no;
    container[cno].append(this.div);
  }
}

class Aswap {
  arr = [];
  constructor(c) {
    this.c = c;
    this.checkScore = document.getElementById(`sc${this.c}`);
    this.swapScore = document.getElementById(`ss${this.c}`);
  }

  async swap(p1, p2) {
    p1.div.style.background = p2.div.style.background = swapColor;

    let ofset1 = p1.xpos;
    let ofset2 = p2.xpos;
    p1.xpos = ofset2;
    p2.xpos = ofset1;

    p1.div.style.left = `${ofset2}px`;
    p2.div.style.left = `${ofset1}px`;
    await new Promise((r) => setTimeout(r, 300));

    p1.div.style.background = p2.div.style.background = defColor;
    this.swapScore.innerHTML = Number(this.swapScore.innerHTML) + 1;
  }

  async check(p1, p2) {
    p1.div.style.background = p2.div.style.background = checkColor;
    await new Promise((r) => setTimeout(r, 300));

    p1.div.style.background = p2.div.style.background = defColor;
    this.checkScore.innerHTML = Number(this.checkScore.innerHTML) + 1;
  }

  async bubbleSort() {
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr.length - i - 1; j++) {
        await this.check(this.arr[j], this.arr[j + 1]);
        if (this.arr[j].no > this.arr[j + 1].no) {
          [this.arr[j], this.arr[j + 1]] = [this.arr[j + 1], this.arr[j]];
          await this.swap(this.arr[j], this.arr[j + 1]);
        }
      }
    }
  }

  async selectionSort() {
    for (let i = 0; i < this.arr.length; i++) {
      let min = i;
      for (let j = i + 1; j < this.arr.length; j++) {
        await this.check(this.arr[min], this.arr[j]);
        if (this.arr[min].no > this.arr[j].no) {
          min = j;
        }
      }
      if (i != min) {
        [this.arr[i], this.arr[min]] = [this.arr[min], this.arr[i]];
        await this.swap(this.arr[i], this.arr[min]);
      }
    }
  }

  async insertionSort() {
    let j,
      s = 0;
    for (let i = 1; i < this.arr.length; i++) {
      j = i - 1;
      if (s == 0) {
        await this.check(this.arr[j], this.arr[j + 1]);
        s = 1;
      }
      while (j >= 0 && this.arr[j].no > this.arr[j + 1].no) {
        if (s == 0) {
          await this.check(this.arr[j], this.arr[j + 1]);
        }
        [this.arr[j], this.arr[j + 1]] = [this.arr[j + 1], this.arr[j]];
        await this.swap(this.arr[j], this.arr[j + 1]);
        j -= 1;
        s = 0;
      }
      s = 0;
    }
  }
}

function startSorting() {
  let sort1 = sorts1.value;
  let sort2 = sorts2.value;
  switch (sort1) {
    case "bubble":
      obja.bubbleSort();
      break;
    case "selection":
      obja.selectionSort();
      break;
    case "insertion":
      obja.insertionSort();
      break;
  }
  switch (sort2) {
    case "bubble":
      objb.bubbleSort();
      break;
    case "selection":
      objb.selectionSort();
      break;
    case "insertion":
      objb.insertionSort();
      break;
  }
}
