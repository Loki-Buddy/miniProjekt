const taskList = document.getElementById("taskList");
const userTaskInput = document.getElementById("userTaskInput");
const selectOption = document.getElementById("selectOption");
const addTaskButton = document.getElementById("addTaskButton");
const deleteListButton = document.getElementById("deleteListButton");
/* const clearButton = document.getElementById("clearButton"); */

const userListInput = document.getElementById("userListInput");
const addListButton = document.getElementById("addListButton");
const modeLight = document.getElementById("modeLight");
const modeDark = document.getElementById("modeDark");
const bodyIdJs = document.getElementById("bodyId");

modeLight.addEventListener("click", () => {
  bodyIdJs.style.backgroundColor = "white";
  bodyIdJs.style.color = "black";
  modeLight.style.visibility = "hidden";
  modeDark.style.visibility = "visible";
});

modeDark.addEventListener("click", () => {
  bodyIdJs.style.backgroundColor = "black";
  bodyIdJs.style.color = "white";
  modeLight.style.visibility = "visible";
  modeDark.style.visibility = "hidden";
});

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

selectOption.addEventListener("change", async function () {
  taskList.innerHTML = "";
  const response = await fetch("http://localhost:5000/listlog");
  const data = await response.json();
  const selectedList = data.find(
    (tdList) =>
      tdList.listName.toLowerCase() === selectOption.value.toLowerCase()
  );
  selectedList.tasks.forEach((task) => {
    const checkBox = document.createElement("input");
    const newLi = document.createElement("li");
    checkBox.type = "checkbox";
    checkBox.classList.add("checkbox");

    const liText = document.createTextNode(`${task.taskName}`);

    const deleteBtn = document.createElement("button");
    deleteBtn.style.backgroundColor = "white";
    deleteBtn.style.color = "red";
    deleteBtn.style.border = "solid,black,0.5px";
    deleteBtn.style.padding = "10px 5px";
    deleteBtn.style.borderRadius = "5px";
    deleteBtn.style.fontSize = "10px";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.textContent = "❌"; // Unicode for a cross symbol
    deleteBtn.addEventListener("click", () => {
      fetch(
        "http://localhost:5000/deleteTask/" +
          selectOption.value +
          "/" +
          task.taskName,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      newLi.remove();
    });

    newLi.appendChild(checkBox);
    newLi.appendChild(liText);
    newLi.appendChild(deleteBtn);
    taskList.appendChild(newLi);
  });
});

// Function to add a task
addTaskButton.addEventListener("click", async function () {
  const taskText = userTaskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    redboxtask();
    return;
  }

  fetch("http://localhost:5000/createTask/" + selectOption.value, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskName: taskText }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });

  const checkBox = document.createElement("input");
  const newLi = document.createElement("li");
  checkBox.type = "checkbox";
  checkBox.classList.add("checkbox");

  const liText = document.createTextNode(`${taskText}`);
  /* newLi.textContent = `${taskText} - ${selectOption.value}`; */

  /* checkBox.addEventListener("change", () => {

    }); */

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.backgroundColor = "white";
  deleteBtn.style.width = "30px";
  deleteBtn.style.height = "30px";
  deleteBtn.style.color = "red";
  (deleteBtn.style.border = "solid,black"), "1px";
  deleteBtn.style.padding = "10px 10px";
  deleteBtn.style.borderRadius = "5px";
  deleteBtn.style.fontSize = "8px";
  deleteBtn.style.marginLeft = "15px";

  deleteBtn.addEventListener("click", () => {
    fetch(
      "http://localhost:5000/deleteTask/" + selectOption.value + "/" + taskText,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    taskList.removeChild(newLi);
  });
  newLi.appendChild(checkBox);
  newLi.appendChild(liText);
  newLi.appendChild(deleteBtn);
  taskList.appendChild(newLi);

  // Clear input after adding
  userTaskInput.value = "";
});

// Clear entire task list
/* clearButton.addEventListener("click", () => {
    taskList.innerHTML = "";
  }); */

//Delete List
deleteListButton.addEventListener("click", () => {
  console.log(selectOption.value);
  fetch("http://localhost:5000/deleteList/" + selectOption.value, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});

// Delete user input  --> conflict mit clear button function

// deleteButton.addEventListener("click", () => {
//   userInput.value = "";
// });

// Mit Enter' bestätigen
let input = document.getElementById("userListInput");
input.addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addListButton").click();
  }
});

let input2 = document.getElementById("userTaskInput");
input2.addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addTaskButton").click();
  }
});

function redboxlist() {
  const list = userListInput.value;
  let isValid = true;
  if (!list) {
    userListInput.style.border = "2px solid red";
    isValid = false;
  } else {
    userListInput.style.border = "";
  }
}

function redboxtask() {
  const task = userTaskInput.value;
  let isValid = true;
  if (!task) {
    userTaskInput.style.border = "2px solid red";
    isValid = false;
  } else {
    userTaskInput.style.border = "";
  }
}
