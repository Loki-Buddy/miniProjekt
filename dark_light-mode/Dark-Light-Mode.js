const modeLight = document.getElementById("modeLight");
const modeDark = document.getElementById("modeDark")
const bodyIdJs = document.getElementById("bodyId");
modeLight.addEventListener("click", () => {
    bodyIdJs.style.backgroundColor = "white";
    bodyIdJs.style.color = "black";
    modeLight.style.visibility = "hidden";
    modeDark.style.visibility = "visible"


})

modeDark.addEventListener("click", () => {
    bodyIdJs.style.backgroundColor = "black";
    bodyIdJs.style.color = "white";
    modeLight.style.visibility = "visible";
    modeDark.style.visibility = "hidden"


})

//HTML Code 
// <img src="./sun-xxl.png" alt="light mode" width="30px" id="modeLight">
// <img src="./sun.png" alt="dark mode" width="30px" id="modeDark">

// CSS Code
// #modeDark {
//   visibility: hidden;
//}

// Mit Enter' bestätigen
// var input = document.getElementById("preis");
// input.addEventListener("keypress", function(event) {
//  if (event.key === "Enter") {
//    event.preventDefault();
//    document.getElementById("addButton").click();
//  }
//});

//function createTask() {
//    const activityTi = document.getElementById("Activity").value;
//    const creationDateTi = document.getElementById("Date of creation").value;
//    const DateTi = document.getElementById("repeatPasswordTI").value;
//    if (!activityTi || !creationDateTi || !DateTi) {
//        alert("Bitte fülle alle Felder aus!");
//        return;
//    }