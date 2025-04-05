const userTaskInput = document.getElementById("userTaskInput");
const selectOption = document.getElementById("selectOption");
const addTaskButton = document.getElementById("addTaskButton");
const editListButton = document.getElementById("editListButton");
const deleteListButton = document.getElementById("deleteListButton");
const userListInput = document.getElementById("userListInput");
const addListButton = document.getElementById("addListButton");
const modeLight = document.getElementById("modeLight");
const modeDark = document.getElementById("modeDark")
const bodyIdJs = document.getElementById("bodyId");

const taskdivContainer = document.createElement("div");
const taskList = document.createElement("ul");
const noTasks = document.createElement("span");
noTasks.innerText = "No Tasks detected...";
noTasks.style.color = "red";
noTasks.style.marginLeft = "10px";

const updateTaskInput = document.createElement("input");
updateTaskInput.id = "updateTaskInput";
const updateListInput = document.createElement("input");
updateListInput.id = "updateListInput";


// Limit the length of the input
userTaskInput.setAttribute("maxlength", "40");

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
		const result = await response.json();

		const newOption = document.createElement("option");
		newOption.value = result.listName; // Set the value of the option to the list name
		newOption.textContent = result.listName; // Set the text of the option to the list name
		selectOption.appendChild(newOption); // Append the new option to the select element

		userListInput.value = "";
	} catch (error) {
		console.error("Error:", error);
	}


});

// Function to fetch and display tasks when a list is selected
selectOption.addEventListener("change", async function () {
	taskdivContainer.id = "taskdivContainer";
	taskdivContainer.appendChild(taskList);
	bodyIdJs.appendChild(taskdivContainer);
	taskList.id = "taskList";
	taskList.innerHTML = "";

	const response = await fetch("http://localhost:5000/listlog");
	const data = await response.json();
	const selectedList = data.find(tdList => tdList.listName.toLowerCase() === selectOption.value.toLowerCase());

	deleteListButton.disabled = false;

	if (selectedList.tasks.length == 0) {
		taskList.appendChild(noTasks);
	}

	if (selectOption.value != "default") {
		userTaskInput.disabled = false;
		addTaskButton.disabled = false;
	}

	if (selectOption.value == "default") {
		deleteListButton.disabled = true;
	}

	selectedList.tasks.forEach(task => {
		const checkBox = document.createElement("input");
		const newLi = document.createElement("li");
		checkBox.type = "checkbox";
		checkBox.classList.add("checkbox");

		const liText = document.createElement("span");
		liText.classList.add("taskText");
		liText.textContent = task.taskName;

		const editBtn = document.createElement("button");
		editBtn.classList.add("editButton");
		editBtn.textContent = "✏️";

		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("deleteButton");
		deleteBtn.textContent = "❌";

		deleteBtn.addEventListener("click", () => {
			fetch("http://localhost:5000/deleteTask/" + selectOption.value + "/" + task.taskName, {
				method: "DELETE",
			})
				.then(res => res.json())
				.then(data => {
					console.log(data);
				});


			newLi.remove();

			if (taskList.children.length == 0) {
				taskList.appendChild(noTasks);
			}
		});

		editBtn.addEventListener("click", () => {
			let oldTaskName = liText.textContent;
			liText.replaceWith(updateTaskInput);
			updateTaskInput.value = oldTaskName;

			updateTaskInput.addEventListener("keypress", async function (event) {
				let newTaskName = updateTaskInput.value;
				if (event.key === "Enter") {
					await fetch("http://localhost:5000/updateTask/" + selectedList.listName + "/" + oldTaskName, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ taskName: newTaskName })
					})
					liText.textContent = newTaskName
					updateTaskInput.replaceWith(liText);
				}

				deleteBtn.addEventListener("click", () => {
					fetch("http://localhost:5000/deleteTask/" + selectOption.value + "/" + newTaskName, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						}
					})
						.then(res => res.json())
						.then(data => {
							console.log("scheint geklappt zu haben")
						});

					/* taskList.removeChild(newLi); */
					if (taskList.children.length == 0) {
						taskList.appendChild(noTasks);
					}
				});
			})
		});

		newLi.appendChild(checkBox);
		newLi.appendChild(liText);
		newLi.appendChild(editBtn);
		newLi.appendChild(deleteBtn);
		taskList.appendChild(newLi);
	});
})

// Function to add a task
addTaskButton.addEventListener("click", async function () {
	noTasks.remove();

	const taskText = userTaskInput.value.trim();
	if (taskText === "") {
		alert("Please enter a task!");
		redboxtask();
		return;
	}

	await fetch("http://localhost:5000/createTask/" + selectOption.value, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ taskName: taskText })
	})
		.then(res => res.json())
		.then(data => {
			
		});

	const checkBox = document.createElement("input");
	const newLi = document.createElement("li");
	checkBox.type = "checkbox";
	checkBox.classList.add("checkbox");

	const liText = document.createElement("span");
	liText.classList.add("taskText");
	liText.textContent = taskText;

	const editBtn = document.createElement("button");
	editBtn.classList.add("editButton");
	editBtn.textContent = "✏️";

	const deleteBtn = document.createElement("button");
	deleteBtn.classList.add("deleteButton");
	deleteBtn.textContent = "❌";

	editBtn.addEventListener("click", () => {
		let oldTaskName = liText.textContent;
		liText.replaceWith(updateTaskInput);
		updateTaskInput.value = oldTaskName;

		updateTaskInput.addEventListener("keypress", async function (event) {
			let newTaskName = updateTaskInput.value;
			if (event.key === "Enter") {
				const response = await fetch("http://localhost:5000/listlog");
				const data = await response.json();
				const selectedList = data.find(tdList => tdList.listName.toLowerCase() === selectOption.value.toLowerCase());

				await fetch("http://localhost:5000/updateTask/" + selectedList.listName + "/" + oldTaskName, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ taskName: newTaskName })
				})
				liText.textContent = newTaskName
				updateTaskInput.replaceWith(liText);
			}

			deleteBtn.addEventListener("click", () => {
				fetch("http://localhost:5000/deleteTask/" + selectOption.value + "/" + newTaskName, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					}
				})
					.then(res => res.json())
					.then(data => {
						
					});

				/* taskList.removeChild(newLi); */
				if (taskList.children.length == 0) {
					taskList.appendChild(noTasks);
				}
			});
		})
	});

	deleteBtn.addEventListener("click", () => {
		fetch("http://localhost:5000/deleteTask/" + selectOption.value + "/" + taskText, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
			});

		taskList.removeChild(newLi);
		if (taskList.children.length == 0) {
			taskList.appendChild(noTasks);
		}
	});


	newLi.appendChild(checkBox);
	newLi.appendChild(liText);
	newLi.appendChild(editBtn);
	newLi.appendChild(deleteBtn);
	taskList.appendChild(newLi);

	// Clear input after adding
	userTaskInput.value = "";
});

//Edit List
editListButton.addEventListener("click", () => {
	let oldListName = selectOption.value;
	selectOption.replaceWith(updateListInput);




























































	
});

//Delete List
deleteListButton.addEventListener("click", () => {
	taskdivContainer.remove();
	fetch("http://localhost:5000/deleteList/" + selectOption.value, {
		method: "DELETE"
	})
		.then(res => res.json())
		.then(data => {
			console.log(data);
		});
	selectOption.remove(selectOption.selectedIndex);
	taskList.innerHTML = "";


	//Zeigt den default wert im Select an wenn keine Listen mehr vorhanden sind
	if (selectOption.length - 1 == 0) {
		selectOption.value = "default";
		deleteListButton.disabled = true;
	}
});

//LightMode
modeLight.addEventListener("click", () => {
	bodyIdJs.style.backgroundColor = "white";
	bodyIdJs.style.color = "black";
	modeLight.style.visibility = "hidden";
	modeDark.style.visibility = "visible";
})
//DarkMode
modeDark.addEventListener("click", () => {
	bodyIdJs.style.backgroundColor = "rgb(28, 28, 28)";
	bodyIdJs.style.color = "white";
	modeLight.style.visibility = "visible";
	modeDark.style.visibility = "hidden";
})

window.onload = function () {
	fetch("http://localhost:5000/listlog")
		.then(res => res.json())
		.then(data => {
			data.forEach(tdList => {
				const newOption = document.createElement("option");
				newOption.value = tdList.listName; // Set the value of the option to the list name
				newOption.textContent = tdList.listName; // Set the text of the option to the list name
				selectOption.appendChild(newOption); // Append the new option to the select element
			});
		});

	if (selectOption.value == "default") {
		deleteListButton.disabled = true;
		userTaskInput.disabled = true;
		addTaskButton.disabled = true;
	}
}


function redboxlist() {
	const list = userListInput.value;
	let isValid = true;
	if (!list) {
		userListInput.style.border = "4px solid red"
		isValid = false;
	} else {
		userListInput.style.border = ""
	}
}

function redboxtask() {
	const task = userTaskInput.value;
	let isValid = true;
	if (!task) {
		userTaskInput.style.border = "4px solid red"
		isValid = false;
	} else {
		userTaskInput.style.border = ""
	}
}

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