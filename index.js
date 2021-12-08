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
// Begin !!        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const saveButtonEl = document.getElementById("save-button-el")
const listContainerEl = document.getElementById("listContainer-el")
const input = document.getElementById("input-text-el")
let myList = []

function render(objectParameter) {     // aici am functia de rendere,
    const listItemBox = document.createElement('div')
    listItemBox.setAttribute("class","listItemBox")
    listContainerEl.appendChild(listItemBox)

    const listItem = document.createElement('div')
    listItem.setAttribute("class","listItem")
    listItemBox.appendChild(listItem)

    const checkboxEl = document.createElement('input')
    checkboxEl.setAttribute("type","checkbox")
    checkboxEl.setAttribute("class","checkbox")
    listItem.appendChild(checkboxEl)
    checkboxEl.innerHTML = objectParameter.checkValue
 
    const labelEl = document.createElement('label')
    labelEl.setAttribute("class","label")
    listItem.appendChild(labelEl)
    labelEl.innerHTML = objectParameter.textValue
 
    const buttonEl = document.createElement('button')
    buttonEl.setAttribute("class","delete")
    listItem.appendChild(buttonEl)
    buttonEl.innerHTML = "x"

    const statusEl = document.createElement('p')
    statusEl.setAttribute("class","paragraph")
    listItemBox.appendChild(statusEl)
    statusEl.innerHTML = "status:"

    buttonEl.addEventListener("click", function() {           // BUTTON X DELETE
        listContainerEl.removeChild(listItemBox)
        //aflam pozitia in array
        const indexPosition = myList.indexOf(objectParameter)
        myList.splice(indexPosition,1)
       saveList()
    })

    checkboxEl.addEventListener("click", function() {           // CHECKBOX
        if (checkboxEl.checked === true) {
            checkboxEl.removeAttribute("checked")
            checkboxEl.checked = false
        }
        else {
            checkboxEl.checked = true
            checkboxEl.setAttribute("checked")
        }
        // checkboxEl.checked = true
        console.log(checkboxEl.checked + " am facut click")
        const indexPosition = myList.indexOf(objectParameter)
        console.log(indexPosition)
        myList.indexOf(objectParameter).checkValue = checkboxEl.checked

        // saveCheckboxValue()
        localStorage.setItem(storeKey, JSON.stringify(myList))


        listContainerEl.removeChild(listItemBox)
        myList.forEach(render)

    })
}

// function saveCheckboxValue() {
    
// }
function insert() {    //  functia insert imi creeaza un obiect in care pun ce citesc de pe input                                        pas 4
    let myObject = {
        checkValue: false,
        textValue : input.value,
    }
    myList.push(myObject)  //  obiectul meu e impins intr o matrice de obiecte                                                           pas 5
    saveList()     // apelez functia saveList()  ca sa pun myList(matricea mea de obiecte) in localStorage                               pas 6
    // console.log("joined")
    // console.log(myList)
    // console.log(myList[0].textValue)
    render(myObject)  // in baza valorilor obiectului meu, rendez obiectul                                                               pas 7
}
saveButtonEl.addEventListener("click", insert)    //  codul incepe cu butonul de salvare ce imi apeleaza functia insert                  pas 3
const storeKey = "list"
// const storeTruth = "truth"
function loadFromStorage() {  //   mi am incarcat din localStorage valorile in myList(matricea mea de obiectete cu valori anterioare)    pas 2
    const string = localStorage.getItem(storeKey)
    if (string) {
        myList = JSON.parse(string)
    }
    myList.forEach(render)
}
loadFromStorage()   //      la primul ciclu de interpretare scot din localStorage valorile anterioare                                    pas 1                                                              
function saveList() {     //                                 
    localStorage.setItem(storeKey, JSON.stringify(myList))
}
// listContainerEl.addEventListener("click", function(event) {
//     console.log(event.target)
// })



