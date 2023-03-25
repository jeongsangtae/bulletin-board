const boardWriteForm = document.querySelector(".board-write-container");
const boardTitle = document.querySelector(".board-title");
const boardInfoNum = document.querySelector(".board-info-num");
const boardInfoWriter = document.querySelector(".board-info-writer");
const boardInfoDate = document.querySelector(".board-info-date");
const boardInfoViews = document.querySelector(".board-info-views");
const boardContent = document.querySelector(".board-content");
const titleInput = document.querySelector("#title-input");
const infoWriterInput = document.querySelector("#info-writer");
const infoPasswordInput = document.querySelector("#info-password");
const contentInfo = document.querySelector("#content-textarea");

const btnAdd = document.querySelector(".btn-add");

const BOARD_LISTS = "boardlists";
let boardData = [];
let date = new Date(); // 현재 시간
let num = 0;

date = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

// let dateString = date.toLocaleDateString("ko-KR", {
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// });7

// function boardListView () {
//   const
// }

function saveBoardData() {
  localStorage.setItem(BOARD_LISTS, JSON.stringify(boardData));
}

function writeContents(newBoardObject) {
  const title = document.createElement("div");
  title.innerText = newBoardObject.title;
  const ddNum = document.createElement("dd");
  ddNum.innerText = newBoardObject.num;
  const ddWriter = document.createElement("dd");
  ddWriter.innerText = newBoardObject.writer;
  const ddDate = document.createElement("dd");
  ddDate.innerText = newBoardObject.date;
  const ddContent = document.createElement("div");
  ddContent.innerText = newBoardObject.content;
  boardTitle.appendChild(title);
  boardInfoNum.appendChild(ddNum);
  boardInfoWriter.appendChild(ddWriter);
  boardInfoDate.appendChild(ddDate);
  // boardInfoViews.appendChild()
}

function writeAdd(event) {
  event.preventDefault();
  // const saveInputData = boardWriteInput.value;
  // console.log(saveInputData);
  const saveTitleInput = titleInput.value;
  const saveInfoWriterInput = infoWriterInput.value;
  const saveInfoPasswordInput = infoPasswordInput.value;
  const saveContentInfo = contentInfo.value;
  saveTitleInput.value = "";
  saveInfoWriterInput.value = "";
  saveInfoPasswordInput.value = "";
  saveContentInfo.value = "";

  const newBoardObject = {
    title: saveTitleInput,
    num: num++,
    writer: saveInfoWriterInput,
    password: saveInfoPasswordInput,
    content: saveContentInfo,
    date: date,
  };
  boardData.push(newBoardObject);
  writeContents(newBoardObject);
  saveBoardData();
}

boardWriteForm.addEventListener("submit", writeAdd);

const savedBoardData = localStorage.getItem(BOARD_LISTS);

if (savedBoardData !== null) {
  const parsedBoardData = JSON.parse(savedBoardData);
  boardData = parsedBoardData;
  parsedBoardData.forEach(boardListView);
}
