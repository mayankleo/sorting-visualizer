const defColor = "#14a76c";
const checkColor = "#ffe400";
const swapColor = "#ff652f";

const container = document.getElementsByClassName("container2");
const rangeiv = document.getElementById("rangeiv");
const range = document.getElementById("range");
const rangetext = document.getElementById("rangev");
const sorts1 = document.getElementById("sorts1");
const sorts2 = document.getElementById("sorts2");
const inum = document.getElementById("intext");
const sgen = document.getElementById("sgen");
const ssat = document.getElementById("sstarter");
const sstop = document.getElementById("stop");

var obja, objb, speed = 300, istop = true;

function rangevalue(x) {
  rangetext.innerHTML = x;
}

function speedvalue() {
  let ele = document.getElementsByName("speed");
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked)
      speed = Number(ele[i].value);
  }
}


function generate() {
  let el = range.value;

  obja = new Aswap("a", el);
  objb = new Aswap("b", el);
  obja.checkScore.innerHTML = obja.swapScore.innerHTML = objb.checkScore.innerHTML = objb.swapScore.innerHTML = 0;
  container[0].style.width = container[1].style.width = "100%";
  container[0].innerHTML = container[1].innerHTML = "";
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
  constructor(c, el) {
    this.arr = new Array(el);
    this.c = c;
    this.isstop = true;
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
    await new Promise((r) => setTimeout(r, speed));

    p1.div.style.background = p2.div.style.background = defColor;
    this.swapScore.innerHTML = Number(this.swapScore.innerHTML) + 1;
  }

  async check(p1, p2) {
    p1.div.style.background = p2.div.style.background = checkColor;
    await new Promise((r) => setTimeout(r, speed));

    p1.div.style.background = p2.div.style.background = defColor;
    this.checkScore.innerHTML = Number(this.checkScore.innerHTML) + 1;
  }

  async bubbleSort() {
    this.isstop = false;
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr.length - i - 1; j++) {
        if(istop){
          this.isstop=true;
          break
        }
        await this.check(this.arr[j], this.arr[j + 1]);
        if (this.arr[j].no > this.arr[j + 1].no) {
          [this.arr[j], this.arr[j + 1]] = [this.arr[j + 1], this.arr[j]];
          await this.swap(this.arr[j], this.arr[j + 1]);
        }
      }
    }
    this.isstop=true;
    stop();
  }

  async selectionSort() {
    this.isstop = false;
    for (let i = 0; i < this.arr.length; i++) {
      let min = i;
      for (let j = i + 1; j < this.arr.length; j++) {
        if(istop){
          this.isstop=true;
          break
        }
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
    this.isstop=true;
    stop();
  }

  async insertionSort() {
    this.isstop = false;
    let j,s = 0;
    for (let i = 1; i < this.arr.length; i++) {
      if(istop){
        this.isstop=true;
        break
      }
      j = i - 1;
      if (s == 0) {
        await this.check(this.arr[j], this.arr[j + 1]);
        s = 1;
      }
      while (j >= 0 && this.arr[j].no > this.arr[j + 1].no) {
        if(istop){
          this.isstop=true;
          break
        }
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
    this.isstop=true;
    stop();
  }
}

function stop(){
  if(obja.isstop==true && objb.isstop==true){
    istop = true;
    sgen.removeAttribute('disabled');
    sorts1.removeAttribute('disabled');
    sorts2.removeAttribute('disabled');
    range.removeAttribute('disabled');
    rangeiv.style.borderColor="#fff";
    rangetext.style.color="#fff";
    ssat.removeAttribute('disabled');
    sstop.setAttribute('disabled', '');
  }
}

function stopbybt(){
  obja.isstop = true;
  objb.isstop = true;
  istop = true;
  stop();
}

function btdisabler(){
  sgen.setAttribute('disabled', '');
  sorts1.setAttribute('disabled', '');
  sorts2.setAttribute('disabled', '');
  range.setAttribute('disabled', '');
  rangeiv.style.borderColor="#696969";
  rangetext.style.color="#696969";
  ssat.setAttribute('disabled', '');
  sstop.removeAttribute('disabled');
  istop = false;
}

function startSorting() {
  btdisabler();
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
