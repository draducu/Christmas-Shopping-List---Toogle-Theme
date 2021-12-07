const christmasBtn = document.getElementById("christmas-button")
const treeBtn = document.getElementById("tree-button")
const snowManBtn = document.getElementById("snowMan-button")
const spanSantaEl = document.getElementById("spanSanta-el")
const spanTreeEl = document.getElementById("spanTree-el")
const spanSnowManEl = document.getElementById("spanSnowMan-el")
const myImageEl = document.getElementById("myImage-el")
let theme = ""

function reveal(span) {
    if (span.style.display == "none") {
        span.style.display = "inline";
    }
}
function hide(span) {
    if (span.style.display !== "none") {
        span.style.display = "none";
    }
}
if (typeof chrome !== "undefined" && typeof chrome.extension !== "undefined") {
    console.log("extensie")
}
else {
    console.log("not extensie")
}
theme = localStorage.getItem("theme")
console.log(theme)
if (theme === null) {
    hide(spanTreeEl)
    hide(spanSnowManEl)
    document.getElementById("christmas-button").checked = true;
}

if (theme === "santa") {
    santa()
    document.getElementById("christmas-button").checked = true;
}
if (theme === "tree") {
    tree()
    document.getElementById("tree-button").checked = true;
}
if (theme === "snowMan") {
    snowMan()
    document.getElementById("snowMan-button").checked = true;
}

function santa() {
    document.body.classList.remove("snow")
    document.body.classList.add("christmas")
    document.body.classList.remove("tree")
    reveal(spanSantaEl)
    hide(spanTreeEl)
    hide(spanSnowManEl)
    myImageEl.src ="pictures/santa.png" //mod de a seta sursa imaginii

    localStorage.setItem("theme", "santa")
}
function tree() {
    document.body.classList.remove("snow")
    document.body.classList.add("tree")
    document.body.classList.remove("christmas")
    reveal(spanTreeEl)
    hide(spanSantaEl)
    hide(spanSnowManEl)
    myImageEl.setAttribute("src", "pictures/tree.png") // un mod diferit de a seta sursa imaginii

    localStorage.setItem("theme", "tree")
}
function snowMan() {
    document.body.classList.remove("christmas")
    document.body.classList.remove("tree")
    document.body.classList.add("snow")
    reveal(spanSnowManEl)
    hide(spanTreeEl)
    hide(spanSantaEl)
    myImageEl.src ="pictures/snowMan.png"

    localStorage.setItem("theme", "snowMan")
}
christmasBtn.addEventListener("click", santa )
treeBtn.addEventListener("click", tree )
snowManBtn.addEventListener("click", snowMan )

// Begin !!                             @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
let saveButtonEl = document.getElementById("save-button-el")
let listContainerEl = document.getElementById("listContainer-el")
let input = document.getElementById("input-text-el")
let myList = []
let position = -1
class Template {
    constructor(checkValue, textValue, button ) {
        this.checkValue = checkValue;
        this.textValue = textValue;
        this.button = button;
        this.position = position;
    }
}
function renderlistItemBox() {
    this["listItemBox" + position] = document.createElement('div')
    this["listItemBox" + position].setAttribute("class","listItemBox")
    listContainerEl.appendChild(this["listItemBox" + position])
    renderlistItem()
}
function renderlistItem() {
    this["listItem" + position] = document.createElement('div')
    this["listItem" + position].setAttribute("class","listItem")
    this["listItemBox" + position].appendChild(this["listItem" + position])
    rendercheckBox()
}
function rendercheckBox() {
    this["checkbox" + position] = document.createElement('input')
    this["checkbox" + position].setAttribute("type","checkbox")
    this["checkbox" + position].setAttribute("class","checkbox")
    this["listItem" + position].appendChild(this["checkbox" + position])
    renderlabel()
}  
function renderlabel() {
    this["label" + position] = document.createElement('label')
    this["label" + position].setAttribute("class","label")
    this["listItem" + position].appendChild(this["label" + position])
    this["label" + position].innerHTML = "VICTORIE"
    renderdeleteButton()
} 
function renderdeleteButton() {
    this["button" + position] = document.createElement('button')
    this["button" + position].setAttribute("class","delete")
    this["listItem" + position].appendChild(this["button" + position])
    this["button" + position].innerHTML = "x"
    renderstatus()
} 
function renderstatus() {
    this["status" + position] = document.createElement('p')
    this["status" + position].setAttribute("class","paragraph")
    this["listItemBox" + position].appendChild(this["status" + position])
    this["status" + position].innerHTML = "status:"
} 






function insert() {
    position = position + 1
    let myObject = new Template("checkValue", input.value, false, position)
    
    myList.push(myObject)
    console.log("joined")
    console.log(myList)
    console.log(myList[0].textValue)

    renderlistItemBox()
}
saveButtonEl.addEventListener("click", insert)











