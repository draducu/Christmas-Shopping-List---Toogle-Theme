const style = document.getElementById("style")
if (typeof chrome !== "undefined" && typeof chrome.extension !== "undefined") {
    console.log("extensie")
    style.setAttribute("href","styles/index-extension.css")
}
else {
    console.log("not extension")
    style.setAttribute("href","styles/index.css")
}
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
// Begin !!        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 2nd part
const saveButtonEl = document.getElementById("save-button-el")
const listContainerEl = document.getElementById("listContainer-el")
const input = document.getElementById("input-text-el")
let myList = []

function render(objectParameter) {     //  aici am functia de render,                                                                                               pas 8
    const listItemBox = document.createElement('div')    // am creat un div-listItemBox                                                                             pas 9
    listItemBox.setAttribute("class","listItemBox")
    listContainerEl.appendChild(listItemBox)      // ce a fost atasat la un div-listContainer  din html                                                             pas 10

    const listItem = document.createElement('div')  // am creat un div-listItem   
    listItem.setAttribute("class","listItem")
    listItemBox.appendChild(listItem)    // ce a fost atasat la un div-listItemBox, creat anterior                                                  `               pas 11

    const truthFromStorage = JSON.parse(localStorage.getItem(storeKey))  // aici am scos obiectul meu din localStorage                                              pas 12
    const indexPosition = myList.indexOf(objectParameter) // de fiecare data cand parcurg aceasta functie pentru un obiect trebuie sa stiu la care obiect sunt      pas 13
    objectParameter.checkValue = truthFromStorage[indexPosition].checkValue // valoarea din localStotage pentru obiectul de index actual da valoare la variabila    pas 14
    console.log(objectParameter.checkValue + " valoare de adevar in functie de index din localStorage ") // ce scot din localstorage f(index)                        
    console.log(JSON.stringify(truthFromStorage) + " This is moment of truth from LS!") // imi arata cate obiecte si cate key am in consola (converteste un obiect in string)
    // console.log((truthFromStorage) + "This is moment of truth !") // printeaza ca object, imi arata ca are 2 obiecte key in consola, not good

    const checkboxEl = document.createElement('input') // am creat un input-checkboxEl listItem                                                                     pas 15
    checkboxEl.setAttribute("type","checkbox")
    checkboxEl.setAttribute("class","checkbox")
    listItem.appendChild(checkboxEl) // si l am atasat la div-listItem                                                                                              pas 16

    if (objectParameter.checkValue === true) { // fara acest if, nu stie sa imi rendeze la inceput checkbox ul bifat                                                pas 17
        checkboxEl.checked = true // checkbox bifatdaca valoarea mea de adevar luata din obiect de la key (checkValue) e adevarata
    }
    // console.log(checkboxEl.checked + " la generare din render !")
    checkboxEl.innerHTML = objectParameter.checkValue // pentru a mi renda 
 
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
    statusEl.innerHTML = "not purchased"

    if ( checkboxEl.checked) {
        statusEl.innerHTML = "purchased"
    }
    buttonEl.addEventListener("click", function() {           // BUTTON X DELETE
        listContainerEl.removeChild(listItemBox)
        //aflam pozitia in array
        const indexPosition = myList.indexOf(objectParameter)
        myList.splice(indexPosition,1)
        saveList()
    })
    checkboxEl.addEventListener("click", function() {   // CHECKBOX
        const indexPosition = myList.indexOf(objectParameter)
        console.log(indexPosition)
        myList[indexPosition].checkValue = checkboxEl.checked
        localStorage.setItem(storeKey, JSON.stringify(myList))

        if ( checkboxEl.checked) {
            statusEl.innerHTML = "purchased"
        }
        else {
            statusEl.innerHTML = "not purchased"
        }
    })
}
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
