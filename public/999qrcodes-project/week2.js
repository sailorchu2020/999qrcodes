const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  const taskText = inputBox.value.trim();

  if (taskText === '') {
    alert("You must write something!");
    return;
  }
  
  let li = document.createElement("li");
  li.textContent = taskText;

  let span = document.createElement("span");
  span.textContent = "\u00d7"; // × symbol
  li.appendChild(span);

  listContainer.appendChild(li);
  inputBox.value = "";

  saveData();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();
