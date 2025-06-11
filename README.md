# To-Do-Manager MasterWork 1.0

Ein einfaches To-Do-Listen-Projekt mit Listenverwaltung, Aufgabenverwaltung und optionalem Dark/Light-Mode.

## Features

- Aufgabenlisten erstellen, umbenennen und löschen
- Aufgaben zu Listen hinzufügen, bearbeiten, abhaken und löschen
- Drag & Drop zur Neuordnung (optional, noch nicht implementiert)
- Lokale Speicherung der Daten in einer JSON-Datei (`listlog.json`)
- Dark/Light Mode umschaltbar
- Moderne UI mit HTML, CSS und JavaScript
- Backend mit Express.js (Node.js)
- REST-API für alle CRUD-Operationen

## Installation

1. Repository klonen  
   ```sh
   git clone https://github.com/Loki-Buddy/miniProjekt.git
   cd miniProjekt
   ```

2. Abhängigkeiten installieren  
   ```sh
   npm install
   ```

3. Server starten  
   ```sh
   npm start
   ```

4. Öffne `index.html` im Browser (z.B. mit Live Server Extension in VS Code).

## Projektstruktur

- `index.html` – Haupt-Frontend
- `styles.css` – Styles für das Frontend
- `script.js` – Frontend-Logik (UI, API-Aufrufe)
- `index.js` – Express.js Backend (API)
- `listlog.json` – Lokale Datenspeicherung der Listen und Aufgaben
- `dark.png` / `light.png` – Icons für den Dark/Light Mode

## API-Endpunkte

- `GET    /listlog` – Alle Listen und Aufgaben abrufen
- `POST   /createList` – Neue Liste anlegen
- `POST   /createTask/:listName` – Neue Aufgabe zu Liste hinzufügen
- `PUT    /updateList/:listName` – Listenname ändern
- `PUT    /updateTask/:listName/:taskName` – Aufgabenname ändern
- `PUT    /updateCheckbox/:listName/:taskName` – Aufgabe abhaken
- `DELETE /deleteList/:listName` – Liste löschen
- `DELETE /deleteTask/:listName/:taskName` – Aufgabe löschen

## Hinweise

- Das Backend läuft standardmäßig auf Port 5000.
- Die CORS-Einstellungen erlauben Anfragen von `http://127.0.0.1:5501` (anpassbar in [`index.js`](index.js)).
- Für die Sprachsteuerung und Drag & Drop gibt es Platz für Erweiterungen.

---

Made by Lokii, Nassima und Domske
