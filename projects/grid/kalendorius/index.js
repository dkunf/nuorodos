addDaysOfDecember2023();
//set eventlistener on calendar and get id of clicked day
let calendar = document.querySelectorAll(".calendar")[0];
calendar.addEventListener("click", calendarClickHandler);

function addDaysOfDecember2023() {
  for (let i = 1; i < 32; i++) {
    let aDay = document.createElement("div");
    aDay.id = `cell-${i}`;
    aDay.innerHTML = `<span>${i}</span>
    <span id="note-${i}"></span>`;
    if ((i - 3) % 7 == 0) aDay.classList.add("sunday");
    document.querySelectorAll(".calendar")[0].appendChild(aDay);
  }
  markToday();
}

function markToday() {
  let currentDate = new Date();
  let dayOfMonth = currentDate.getDate();
  document.getElementById(`cell-${dayOfMonth}`).classList.add("today");
}
function calendarClickHandler(event) {
  let calendar = document.querySelectorAll(".calendar")[0];
  //we need id of element that was clicked
  //it could be whole div with id like cell-23
  //or span without id
  //or a note with id like note-23
  //anything else is not of our interest so we return
  console.log(event.target);

  let clickedElement = event.target;
  let dayId;
  dayId = clickedElement.id || clickedElement.parentElement.id;
  console.log("extracted id: ", dayId);
  if (!dayId) return;
  //open popup textarea with placeholder="Atmintinė Gruodžio id-ai d."
  //reikia atidengti textarea, paimti teksta ir iskviesti addNote

  //atidengiam tekstarea
  let noteBox = document.getElementById("note-box");
  noteBox.classList.remove("hidden");

  // let textarea = document.getElementById("a-note");

  let dayNr = dayId.split("-")[1];
  let title = document.getElementById("note-title");
  title.textContent = `Atmintinė Gruodžio ${dayNr}-ai d.`;

  // textarea.placeholder = `Atmintinė Gruodžio ${dayNr}-ai d.`;
  //2mygtukai
  let cancelBtn = document.getElementById("cancel-btn");
  let saveBtn = document.getElementById("save-btn");

  cancelBtn.addEventListener("click", backToCalendar);

  //i will need to remove event handler, so it needs a name
  //but also i need to pass 2 arguments to handler: id and text
  //it means i need a wrapper function which returns my handler
  // let textarea = document.getElementById("a-note");
  // let text = textarea.value;
  // console.log("here is text i got originally: ", text);
  saveBtn.addEventListener("click", saveNote);
  function saveNote() {
    let clickedElement = event.target;
    let id;
    id = clickedElement.id || clickedElement.parentElement.id;
    console.log("extracted id: ", id);
    if (!id) return;

    //kreipsimes pagal parent id ir vaikui irasysime texta
    let cell = document.getElementById(id);

    console.log("new id: ", id);
    // console.log("here is id i got: ", id);
    // console.log("here is element i got: ", cell);
    // console.log("here is text i got passed: ", text);

    let textarea = document.getElementById("a-note");
    let text = textarea.value;

    cell.lastChild.textContent = text;
    //o tada pridesime nauja span kad galima butu ateity atmintine prideti
    let newSpan = document.createElement("span");
    cell.appendChild(newSpan);

    cleanUp();

    let saveBtn = document.getElementById("save-btn");
    saveBtn.removeEventListener("click", saveNote);
  }
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
