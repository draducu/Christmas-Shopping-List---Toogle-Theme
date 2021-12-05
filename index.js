const christmasBtn = document.getElementById("christmas-button")
const treeBtn = document.getElementById("tree-button")
const snowManBtn = document.getElementById("snow-button")
const spanSantaEl = document.getElementById("spanSanta-el")
const spanTreeEl = document.getElementById("spanTree-el")
const spanSnowManEl = document.getElementById("spanSnowMan-el")
const myImageEl = document.getElementById("myImage-el")

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

hide(spanTreeEl)
hide(spanSnowManEl)


christmasBtn.addEventListener("click", function() {
    document.body.classList.remove("snow")
    document.body.classList.add("christmas")
    document.body.classList.remove("tree")
    reveal(spanSantaEl)
    hide(spanTreeEl)
    hide(spanSnowManEl)
    myImageEl.src ="pictures/santa.png" //mod de a seta sursa imaginii
})
treeBtn.addEventListener("click", function() {
    document.body.classList.remove("snow")
    document.body.classList.add("tree")
    document.body.classList.remove("christmas")
    reveal(spanTreeEl)
    hide(spanSantaEl)
    hide(spanSnowManEl)
    myImageEl.setAttribute("src", "pictures/tree.png") // un mod diferit de a seta sursa imaginii
})
snowManBtn.addEventListener("click", function() {
    document.body.classList.remove("christmas")
    document.body.classList.remove("tree")
    document.body.classList.add("snow")
    reveal(spanSnowManEl)
    hide(spanTreeEl)
    hide(spanSantaEl)
    myImageEl.src ='pictures/snowMan.png'
})

