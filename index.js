const express = require("express");
const cors = require("cors");
const {format, utcToZonedTime} = require("date-fns-tz");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(cors());

function readFile(){
    const data = fs.readFileSync("test.json", "utf-8");
    return JSON.parse(data);
}

function writeFile(data){
    fs.writeFileSync("test.json", JSON.stringify(data, null, 2)); // JSON.stringify wandelt ein Javascript Objekt in eine JSON Format um
}

app.get("/listlog", (req,res) =>{
    const listlog = readFile();
    res.json(listlog);
});

app.get("/listlog/:id", (req, res) => {
    const listlog = readFile();
    const id = parseInt(req.params.id);
    const tdList = listlog.find((task) => task.id === id);
    if(!tdList){
        return res.status(404).send("Task not found");
    }
    res.json(tdList);
});

app.post("/listlog", (req, res) => {
    const listlog = readFile();
    const {listName} = req.body;
    const newTdList = {
        id: listlog.length > 0 ? Math.max(...listlog.map((tdList) => tdList.id)) + 1 : 10001,
        listName,
        dateOfCreate: new Date().toISOString(),
        tasks: []
    };
    listlog.push(newTdList);
    writeFile(listlog);
    res.json(newTdList);
});

app.post("/listlog/:id/task", (req, res) => {
    const listlog = readFile();
    const id = parseInt(req.params.id);
    const {taskName} = req.body;

    const foundedList = listlog.find(tdList => tdList.id === id);
    const newTask = {
        taskName,
        dateOfCreate: new Date().toISOString(),
        checked: false
    }

    foundedList.tasks.push(newTask);
    writeFile(listlog);	
    res.json(newTask);

});

app.get("/search", (req, res) => {
    const listlog = readFile();
    const listName = req.query;
    if (!listName) {
        return res.status(400).send("List name is required");
    }
    const filteredList = listlog.filter(tdList => tdList.listName.toLowerCase().includes(listName.toLowerCase()));
    res.json(filteredList);
});

/* app.get("/:listName/search", (req, res) => {
    const listlog = readFile();
    const listName = req.params.listName;
    const taskName = req.query.taskName;
    if (!listName) {
        return res.status(400).send("List name is required");
    }
    const filteredList = listlog.filter(tdList => tdList.listName.toLowerCase().includes(listName.toLowerCase()));
    const filteredTask = filteredList.filter(tdList => tdList.tasks.filter(task => task.taskName.toLowerCase().includes(taskName.toLowerCase())));
}); */

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});