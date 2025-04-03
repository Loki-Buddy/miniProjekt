var input = document.getElementById("Date");

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addButton").click();
  }
});
function createTask() {
  const activityTi = document.getElementById("Activity").value;
  const creationDateTi = document.getElementById("Date of creation").value;
  const DateTi = document.getElementById("Date").value;
  if (!activityTi || !creationDateTi || !DateTi) {
    alert("Bitte fülle alle Felder aus!");
    return;
  }
}
