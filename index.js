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

if(typeof chrome !== "undefined" && typeof chrome.extension !== "undefined"){
    console.log("extensie")
}
else {
    console.log("not extensie")
}

theme = localStorage.getItem("theme")
console.log(theme)


if (theme === null){
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

