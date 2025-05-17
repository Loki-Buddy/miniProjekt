const express = require("express");
const cors = require("cors");
const fs = require("fs");

const { toZonedTime, format } = require("date-fns-tz");
const timeZone = "Europe/Berlin";
const now = new Date();
const zonedDate = toZonedTime(now, timeZone);
const formattedDate = format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss'Z'", timeZone);

const app = express();
app.use(express.json());
app.use(cors({              // CORS (Cross origin resource sharing) aktivieren 
    origin: "http://127.0.0.1:5501", // Erlaubt nur Anfragen von dieser URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Erlaubt nur diese Methoden
}))

/**
 * Liest die Datei "listlog.json" und gibt den Inhalt als
 * Javascript-Objekt zur ck.
 *
 * @return {Object} Der Inhalt der Datei "listlog.json" als
 *   Javascript-Objekt.
 */
function readFile() {
    const data = fs.readFileSync("listlog.json", "utf-8");
    return JSON.parse(data);
}

/**
 * Schreibt die Datei "listlog.json" mit dem gegebenen Javascript-Objekt.
 *
 * @param {Object} data Das Javascript-Objekt, das in die Datei "listlog.json"
 *   geschrieben werden soll.
 * 
 * JSON.stringify wandelt ein Javascript Objekt in eine JSON Format um
 */
function writeFile(data) {
    fs.writeFileSync("listlog.json", JSON.stringify(data, null, 2));
}

// Einfache rückgabe der Datei "listlog.json" im Body
app.get("/listlog", (req, res) => {
    const listlog = readFile();
    res.json(listlog);
});

// Nach Listen suchen
app.get("/list/search", (req, res) => {
    const listlog = readFile();
    const listName = req.query.listName;
    if (!listName) {
        return res.status(400).send("Bitte geben Sie eine Liste an!");
    }
    const filteredList = listlog.filter(tdList => tdList.listName.toLowerCase().includes(listName.toLowerCase()));
    res.json(filteredList);
});

// Nach Aufgaben suchen
app.get("/task/search", (req, res) => {
    const listlog = readFile();
    const taskName = req.query.taskName;
    if (!taskName) {
        return res.status(400).send("Bitte geben Sie einen Task an!");
    }

    const filteredTask = listlog.find(tdList => tdList.tasks.find(task => task.taskName.toLowerCase().includes(taskName.toLowerCase())));
    res.json(filteredTask);
});

// Einzelne Liste anlegen
app.post("/createList", (req, res) => {
    const listlog = readFile();

    const listNameConst = req.body.listName;
    let listNameVar = req.body.listName;
    let listName = listNameVar;

    let nameCounter = 1;

    for (const tdList of listlog) {
        if (tdList.listName.toLowerCase() === listName.toLowerCase()) {
            listNameVar = `${listNameConst}${nameCounter++}`;
            listName = listNameVar;
        }
    }

    const newTdList = {
        listName,
        dateOfCreate: formattedDate,
        dateOfUpdate: formattedDate,
        tasks: [
            /* {
                "taskName": "Beispiel",
                "checked": false
            } */
        ]
    };

    listlog.push(newTdList);
    writeFile(listlog);
    res.json(newTdList);
});

// Einzelenen Task in einer bestimmten Liste ablegen/hinzufügen
app.post("/createTask/:listName", (req, res) => {
    const listlog = readFile();

    const listName = req.params.listName;
    const taskName = req.body.taskName;

    const foundedList = listlog.find(tdList => tdList.listName.toLowerCase() === listName.toLowerCase());
    const foundedTask = foundedList.tasks.find(task => task.taskName.toLowerCase() === taskName.toLowerCase());

    // Wenn keine Liste existiert
    if (listlog.length === 0)
        return res.status(400).send("Bitte erst eine Liste anlegen!");

    if (!foundedTask) {
        const newTask = {
            taskName,
            checked: false
        }

        foundedList.tasks.push(newTask);
        foundedList.dateOfUpdate = formattedDate;
        writeFile(listlog);

        return res.json(foundedList);
    }

    if (foundedTask) {
        return res.status(400).send("Aufgabe existiert bereits!");
    }
});

app.put("/updateCheckbox/:listName/:taskName", (req,res) => {
    const listlog = readFile();
    const taskName = req.params.taskName;
    const { checked } = req.body;
    const foundedList = listlog.find(tdList => tdList.tasks.find(task => task.taskName.toLowerCase() === taskName.toLowerCase()));
    const foundedTask = foundedList.tasks.find(task => task.taskName.toLowerCase() === taskName.toLowerCase());

    foundedTask.checked = checked;
    foundedList.dateOfUpdate = formattedDate;
    writeFile(listlog);
    res.json(foundedTask);
});

// Den Namen einer Liste Verändern
app.put("/updateList/:listName", (req, res) => {
    const listlog = readFile();
    const listName = req.params.listName;
    const { listName: updatedListName } = req.body;
    const foundedList = listlog.find(tdList => tdList.listName.toLowerCase() === listName.toLowerCase());
    foundedList.listName = updatedListName;
    foundedList.dateOfUpdate = formattedDate;
    writeFile(listlog);
    res.json(foundedList);
});

// Den Namen einer Aufgabe Verändern
app.put("/updateTask/:listName/:taskName", (req, res) => {
    const listlog = readFile();
    const listName = req.params.listName;
    const taskName = req.params.taskName;
    const { taskName: updatedTaskName } = req.body;
    const foundedList = listlog.find(tdList => tdList.listName.toLowerCase() === listName.toLowerCase());
    const foundedTask = foundedList.tasks.find(task => task.taskName.toLowerCase() === taskName.toLowerCase());
    foundedTask.taskName = updatedTaskName;
    foundedList.dateOfUpdate = formattedDate;
    writeFile(listlog);
    res.json(foundedList);
});

// Liste löschen
app.delete("/deleteList/:listName", (req, res) => {
    const listlog = readFile();
    const listName = req.params.listName;
    const filteredList = listlog.filter(tdList => tdList.listName.toLowerCase() !== listName.toLowerCase());
    writeFile(filteredList);
    res.json(filteredList);
});

// Task löschen
app.delete("/deleteTask/:listName/:taskName", (req, res) => {
    const listlog = readFile();
    const listName = req.params.listName;
    const taskName = req.params.taskName;

    const foundedList = listlog.find(tdList => tdList.listName.toLowerCase() === listName.toLowerCase());
    const foundedTask = foundedList.tasks.find(task => task.taskName.toLowerCase() === taskName.toLowerCase());
    foundedList.tasks = foundedList.tasks.filter(task => task.taskName.toLowerCase() !== taskName.toLowerCase());
    foundedList.dateOfUpdate = formattedDate;
    writeFile(listlog);
    res.json(foundedList);

});

// Port
app.listen(5000, () => {
    console.log("Server läuft auf Port 5000");
});


// =========================================================================================
// Made By Lokii
// =========================================================================================