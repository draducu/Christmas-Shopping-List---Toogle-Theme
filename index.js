const style = document.getElementById("style") 
if (typeof chrome !== "undefined" && typeof chrome.extension !== "undefined") { // daca chrome si chrome.extension sunt definite atunci am extensie 
    console.log("extensie")
    style.setAttribute("href","styles/index-extension.css") // incarc un anumit css
}
else {
    console.log("not extension")
    style.setAttribute("href","styles/index.css") // incarc un anumit css
}
const christmasBtn = document.getElementById("christmas-button")
const treeBtn = document.getElementById("tree-button")
const snowManBtn = document.getElementById("snowMan-button")
const spanSantaEl = document.getElementById("spanSanta-el")
const spanTreeEl = document.getElementById("spanTree-el")
const spanSnowManEl = document.getElementById("spanSnowMan-el")
const myImageEl = document.getElementById("myImage-el")
let theme = ""

function reveal(span) { // functie de display specific emoji
    if (span.style.display == "none") {
        span.style.display = "inline";
    }
}
function hide(span) { // functie de hide specific emoji
    if (span.style.display !== "none") {
        span.style.display = "none";
    }
}
theme = localStorage.getItem("theme") // iau thema din localStorage
console.log(theme)
if (theme === null) {  // daca localStorage este nul atunci imi setez singur
    hide(spanTreeEl)
    hide(spanSnowManEl)
    christmasBtn.checked = true // document.getElementById("christmas-button").checked = true
}
if (theme === "santa") {
    santa()
    christmasBtn.checked = true // document.getElementById("christmas-button").checked = true
}
if (theme === "tree") {
    tree()
    treeBtn.checked = true // document.getElementById("tree-button").checked = true
}
if (theme === "snowMan") {
    snowMan()
    snowManBtn.checked = true // document.getElementById("snowMan-button").checked = true
}
function santa() {
    document.body.classList.remove("snow") // scot clasa
    document.body.classList.add("christmas") // adaug clasa
    document.body.classList.remove("tree") // scot clasa
    reveal(spanSantaEl) // afisez span
    hide(spanTreeEl)    // inchid span
    hide(spanSnowManEl) // inchid span
    myImageEl.src ="pictures/santa.png" // mod de a seta sursa imaginii
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
christmasBtn.addEventListener("click", santa ) // buton
treeBtn.addEventListener("click", tree ) // buton
snowManBtn.addEventListener("click", snowMan ) // buton
// Begin !!        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ 2nd part
const saveButtonEl = document.getElementById("save-button-el")
const listContainerEl = document.getElementById("listContainer-el")
const input = document.getElementById("input-text-el")
let myList = []

function render(objectParameter) {     //  aici am functia de render,                                                                                               pas 8
    const listItemBox = document.createElement('div')    // am creat un div-listItemBox                                                                             pas 9
    listItemBox.setAttribute("class","listItemBox")
    listContainerEl.appendChild(listItemBox)      // ce a fost atasat la un div-listContainer  din html                                                             pas 10

    const listItem = document.createElement('div')  // am creat un div-listItem                                                                                     pas 11
    listItem.setAttribute("class","listItem")
    listItemBox.appendChild(listItem)    // ce a fost atasat la un div-listItemBox, creat anterior                                                                  pas 12

    const truthFromStorage = JSON.parse(localStorage.getItem(storeKey))  // aici am scos obiectul meu din localStorage                                              pas 13
    const indexPosition = myList.indexOf(objectParameter) // de fiecare data cand parcurg aceasta functie pentru un obiect trebuie sa stiu la care obiect sunt      pas 14
    objectParameter.checkValue = truthFromStorage[indexPosition].checkValue // valoarea din localStotage pentru obiectul de index actual da valoare la variabila    pas 15
    console.log(objectParameter.checkValue + " valoare de adevar in functie de index din localStorage ") // ce scot din localstorage in f(index)                        
    console.log(JSON.stringify(truthFromStorage) + "Objects from inside localStorage!") // imi arata cate obiecte si cate key am in consola (converteste un obiect in string)
    // console.log((truthFromStorage) + "This is moment of truth !") // printeaza ca object, imi arata ca are 2 obiecte key in consola, not good ca nu zice ce e in ele

    const checkboxEl = document.createElement('input') // am creat un input-checkboxEl                                                                              pas 16
    checkboxEl.setAttribute("type","checkbox")
    checkboxEl.setAttribute("class","checkbox")
    listItem.appendChild(checkboxEl) // si l am atasat la div-listItem                                                                                              pas 17

    if (objectParameter.checkValue === true) { // fara acest if, nu stie sa imi rendeze la inceput checkbox ul bifat                                                pas 18
        checkboxEl.checked = true // checkbox bifatdaca valoarea mea de adevar luata din obiect de la key (checkValue) e adevarata
    }
    checkboxEl.innerHTML = objectParameter.checkValue // pentru a mi renda in vizual in lista
 
    const labelEl = document.createElement('label') // am creat un label-labelEl                                                                                    pas 19
    labelEl.setAttribute("class","label")
    listItem.appendChild(labelEl) // si l am atasat la div-listItem                                                                                                 pas 20
    labelEl.innerHTML = objectParameter.textValue
 
    const deleteButtonEl = document.createElement('button') // am creat un button-deleteButtonEl                                                                    pas 21
    deleteButtonEl.setAttribute("class","delete")
    listItem.appendChild(deleteButtonEl) // si l am atasat la div-listItem                                                                                          pas 22
    deleteButtonEl.innerHTML = "x"

    const statusEl = document.createElement('p') // am creat un status-statusEl                                                                                     pas 23
    statusEl.setAttribute("class","paragraph")
    listItemBox.appendChild(statusEl) // si l am atasat la div-listItem 
    statusEl.innerHTML = "not purchased" // are ca default not purchased

    if (checkboxEl.checked) { // verifica checkboxEl sa vada daca e adevarat pentru a schimba mesajul in purchased                                                 pas 24
        statusEl.innerHTML = "purchased"
    }
    deleteButtonEl.addEventListener("click", function() {  // BUTTON X DELETE                                                                                       pas 25
        listContainerEl.removeChild(listItemBox) // imi scoate din afisaj un bloc intreg
        const indexPosition = myList.indexOf(objectParameter)  // aflam pozitia in array a obiectului curent pe care am facut click                                 pas 26
        myList.splice(indexPosition,1)  // aici am taiat din matricea mea de obiecte, un obiect cu totul ca sa il scot                                              pas 27
        saveList() // si resalvez in localStorage                                                                                                                   pas 28
    })
    checkboxEl.addEventListener("click", function() {   // CHECKBOX                                                                                                 pas 29
        const indexPosition = myList.indexOf(objectParameter) // aflu pe al catelea obiect din matrice am facut click                                               pas 30
        console.log(indexPosition)
        myList[indexPosition].checkValue = checkboxEl.checked // aflu valoarea de adevar noua a checkboxului care s a schimbat automat cand am apasat pe el         pas 31 
        localStorage.setItem(storeKey, JSON.stringify(myList)) // setez in localStorage schimbarea facuta                                                           pas 32

        if ( checkboxEl.checked) { // daca checkbox ul este acum adevarat se schimba statusul obiectului                                                            pas 33
            statusEl.innerHTML = "purchased"
        }
        else {
            statusEl.innerHTML = "not purchased"
        }
    })
}
function insert() {    //  functia insert imi creeaza un obiect in care pun ce citesc de pe input                                                                   pas 4
    let myObject = {
        checkValue: false,
        textValue : input.value,
    }
    myList.push(myObject)  //  obiectul meu e impins intr o matrice de obiecte                                                                                      pas 5
    saveList()     // apelez functia saveList()  ca sa pun myList(matricea mea de obiecte) in localStorage                                                          pas 6
    // console.log("joined")
    // console.log(myList)
    // console.log(myList[0].textValue)
    render(myObject)  // in baza valorilor obiectului meu, rendez obiectul                                                                                          pas 7
    input.value = ""
}
saveButtonEl.addEventListener("click", insert)    //  codul incepe cu butonul de salvare ce imi apeleaza functia insert                                             pas 3
const storeKey = "list"
function loadFromStorage() {  //   mi am incarcat din localStorage valorile in myList(matricea mea de obiectete cu valori anterioare)                               pas 2
    const string = localStorage.getItem(storeKey)
    if (string) {
        myList = JSON.parse(string)
    }
    myList.forEach(render)
}
loadFromStorage()   //   la primul ciclu de interpretare scot din localStorage valorile anterioare                                                                  pas 1                                                              
function saveList() {      // functia de salvare a listei                              
    localStorage.setItem(storeKey, JSON.stringify(myList))
}
