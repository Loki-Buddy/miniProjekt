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



// Port
app.listen(5000, () => {
    console.log("Server läuft auf Port 5000");
});


// =========================================================================================
// Made By Lokii
// =========================================================================================