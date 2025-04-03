// document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");
  const userTaskInput = document.getElementById("userTaskInput");
  const selectOption = document.getElementById("selectOption");
  const addTaskButton = document.getElementById("addTaskButton");
  const deleteButton = document.getElementById("deleteButton");
  const clearButton = document.getElementById("clearButton");
  const userListInput = document.getElementById("userListInput");
  const addListButton = document.getElementById("addListButton");
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

  // Function to add a new list
  addListButton.addEventListener("click", async function () {
    const listText = userListInput.value.trim();
    if (listText === "") {
      alert("Please enter a list name!");
      redboxlist();
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/createList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listName: listText }),
      });

      if (!response.ok) {
        throw new Error("Failed to create list");
      }

      const result = response.json();
      console.log("List created:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Function to add a task
  addTaskButton.addEventListener("click", async function () {
    const taskText = userTaskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task!");
      redboxtask();
      return;
    }
    const checkBox = document.createElement("userInput");
    const newLi = document.createElement("li");
    newLi.textContent = `${taskText} - ${selectOption.value}`;

    checkBox.type = "checkbox";
    checkBox.addEventListener("change", () => {});

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(newLi);
    });

    newLi.appendChild(deleteBtn);
    taskList.appendChild(newLi);

    // Clear input after adding
    userTaskInput.value = "";
  });

  // Clear entire task list
  clearButton.addEventListener("click", () => {
    taskList.innerHTML = "";
  });

  // Delete user input
  // deleteButton.addEventListener("click", () => {
  //   userInput.value = "";
  // });


// Mit Enter' bestätigen
let input = document.getElementById("userListInput");
input.addEventListener("keypress", async function(event) {
 if (event.key === "Enter") {
   event.preventDefault();
   document.getElementById("addListButton").click();
 }
});

let input2 = document.getElementById("userTaskInput");
input2.addEventListener("keypress", async function(event) {
 if (event.key === "Enter") {
   event.preventDefault();
   document.getElementById("addTaskButton").click();
 }
});

function redboxlist() {
  const list = userListInput.value;
  let isValid = true;
  if (!list) {
      userListInput.style.border = "2px solid red"
      isValid = false;
  } else {
      userListInput.style.border = ""
  }}

function redboxtask() {
  const task = userTaskInput.value;
  let isValid = true;
  if (!task) {
      userTaskInput.style.border = "2px solid red"
      isValid = false;
  } else {
      userTaskInput.style.border = ""
  }}

//});