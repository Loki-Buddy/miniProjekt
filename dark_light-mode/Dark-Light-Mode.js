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
//    const userEmailTi = document.getElementById("emailTI").value;
//    const userPasswordTi = document.getElementById("passwordTI").value;
//    const userRepeatPasswordTi = document.getElementById("repeatPasswordTI").value;
//    const userFirstName = document.getElementById("firstName").value;
//    const userFamilyName = document.getElementById("familyName").value;
//    if (!userEmailTi || !userPasswordTi || !userRepeatPasswordTi || !userFirstName || !userFamilyName) {
//        alert("Bitte fülle alle Felder aus!");
//        return;
//    }