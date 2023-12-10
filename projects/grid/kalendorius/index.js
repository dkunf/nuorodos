//it holds id of latest clicked day in the calendar
let dayId;
let calendar = document.querySelectorAll(".calendar")[0];
calendar.addEventListener("click", calendarClickHandler);
addDaysOfDecember2023();

// ---------------------------------------------------------
function addDaysOfDecember2023() {
  for (let i = 1; i < 32; i++) {
    let aDay = document.createElement("div");
    aDay.id = `cell-${i}`;
    txt = localStorage.getItem(aDay.id) || "";
    if (txt && txt !== "null") {
      aDay.innerHTML = `<h2>${i}</h2>
      <img src="./pics/bin.svg" class="del-btn" alt="bin" /><span>${txt}</span><span></span>`;
    } else {
      aDay.innerHTML = `<h2>${i}</h2>
      <span></span>`;
    }
    if ((i - 3) % 7 == 0) aDay.classList.add("sunday");
    // document.querySelectorAll(".calendar")[0].appendChild(aDay);
    calendar.appendChild(aDay);
  }
  markToday();
}
function markToday() {
  let currentDate = new Date();
  let dayOfMonth = currentDate.getDate();
  document.getElementById(`cell-${dayOfMonth}`).classList.add("today");
}
function calendarClickHandler(event) {
  //first of all if there was text area open, we need to
  // close it and remove button listeners
  let noteBox = document.getElementById("note-box");
  if (!noteBox.classList.contains("hidden")) closeOldTextarea();

  let clickedElement = event.target;

  if (clickedElement.classList.contains("del-btn")) {
    let spanToRemove = clickedElement.nextElementSibling;
    id = clickedElement.id || clickedElement.parentElement.id;
    if (!id) return;

    removeFromStorage(id, spanToRemove.textContent);

    clickedElement.remove();
    if (spanToRemove) spanToRemove.remove();
    return;
  }
  dayId = clickedElement.id || clickedElement.parentElement.id;
  if (!dayId) return;

  //atidengiam tekstarea ir mygtus
  noteBox.classList.remove("hidden");

  //dayId is like cell-3, cell-23,..
  let dayNr = dayId.split("-")[1];
  let title = document.getElementById("note-title");
  title.textContent = `Atmintinė Gruodžio ${dayNr}-ai d.`;

  //2mygtukai
  let cancelBtn = document.getElementById("cancel-btn");
  let saveBtn = document.getElementById("save-btn");

  cancelBtn.addEventListener("click", backToCalendar);

  saveBtn.addEventListener("click", saveBtnHandler);
}
function saveBtnHandler() {
  console.log("extracted id before : ", dayId);
  if (!dayId) return;

  //kreipsimes pagal parent id ir vaikui irasysime texta
  let cell = document.getElementById(dayId);

  let textarea = document.getElementById("a-note");
  let text = textarea.value;
  console.log(text);

  cell.lastChild.textContent = text;
  if (text) addBin(cell.lastChild);
  //o tada pridesime nauja span kad galima butu ateity atmintine prideti
  let newSpan = document.createElement("span");
  cell.appendChild(newSpan);

  //we add to localstorage too
  addToStorage(dayId, text);

  cleanUp();

  let saveBtn = document.getElementById("save-btn");
  saveBtn.removeEventListener("click", saveBtnHandler);
}
function backToCalendar() {
  cleanUp();
  let cancelBtn = document.getElementById("cancel-btn");
  //display:none does not remove event listeners automatically
  cancelBtn.removeEventListener("click", backToCalendar);
}
function cleanUp() {
  let textarea = document.getElementById("a-note");
  textarea.value = "";
  let noteBox = document.getElementById("note-box");
  noteBox.classList.add("hidden");
}
// function assumes that now textarea is open
function closeOldTextarea() {
  let cancelBtn = document.getElementById("cancel-btn");
  cancelBtn.removeEventListener("click", backToCalendar);
  let saveBtn = document.getElementById("save-btn");
  saveBtn.removeEventListener("click", saveBtnHandler);
  let noteBox = document.getElementById("note-box");
  noteBox.classList.add("hidden");
}
//sometimes need to append
function addToStorage(key, value) {
  let oldValue = localStorage.getItem(key);
  if (oldValue) localStorage.setItem(key, oldValue + "\n" + value);
  else localStorage.setItem(key, value);
}
function addBin(el) {
  let binIcon = document.createElement("img");
  binIcon.src = "./pics/bin.svg";
  binIcon.classList.add("del-btn");
  el.insertAdjacentElement("beforebegin", binIcon);
}
function removeFromStorage(id, text) {
  let storedVal = localStorage.getItem(id);
  if (storedVal === text) localStorage.removeItem(id);
  else {
    let updVal = storedVal.replace(text, "");
    localStorage.setItem(id, updVal);
  }
}
