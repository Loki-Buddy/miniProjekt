const modeLight = document.getElementById("modeLight");
const modeDark = document.getElementById("modeDark")
const bodyIdJs = document.getElementById("bodyId");
const addButton = document.getElementById("addButton");
const activityInput = document.getElementById("Activity");
const createDateInput = document.getElementById("Date of creation");
const dateInput = document.getElementById("Date");

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
// Mit Enter' bestätigen
let input = document.getElementById("Activity");
input.addEventListener("keypress", function(event) {
 if (event.key === "Enter") {
   event.preventDefault();
   document.getElementById("addButton").click();
 }
});

let input2 = document.getElementById("Date of creation");
input2.addEventListener("keypress", function(event) {
 if (event.key === "Enter") {
   event.preventDefault();
   document.getElementById("addButton").click();
 }
});

 let input3 = document.getElementById("Date");
 input3.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addButton").click();
  }
});

function addtask() {
    const Activity = activityInput.value;
    const createDate = createDateInput.value;
    const date = dateInput.value;
    let isValid = true;
    if (!Activity) {
        activityInput.style.border = "2px solid red"
        isValid = false;
    } else {
        activityInput.style.border = ""
    }
    if (!createDate) {
        createDateInput.style.border = "2px solid red"
        isValid = false;
    } else {
        createDateInput.style.border = ""
    }
    if (!date) {
        dateInput.style.border = "2px solid red"
        isValid = false;
    } else {
        dateInput.style.border = ""
    }}

addButton.addEventListener("click", () => {
    const activityTi = document.getElementById("Activity").value;
    const creationDateTi = document.getElementById("Date of creation").value;
    const DateTi = document.getElementById("Date").value;
    
        if (!activityTi || !creationDateTi || !DateTi) {
            alert("Please fill all fields!");
            addtask();
        return;}
    })