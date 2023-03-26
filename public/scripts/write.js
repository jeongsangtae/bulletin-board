const boardWriteForm = document.querySelector(".main-container");

const boardListTable = document.querySelector("#board-list-table");
const boardListNum = document.querySelector("#board-list-num");
const boardListTitle = document.querySelector("#board-list-title");
const boardListWriter = document.querySelector("#board-list-writer");
const boardListDate = document.querySelector("#board-list-date");
// const boardListCount = document.querySelector("#board-list-count");

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
let num = 1;
let linkBoardList = "index.html";
let linkWriteContent = "write-content.html";

date = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

function saveBoardData() {
  localStorage.setItem(BOARD_LISTS, JSON.stringify(boardData));
}

function boardLists(newBoardObject) {
  const boardListViewNum = document.createElement("div");
  boardListViewNum.innerText = newBoardObject.num;
  const boardListViewWriter = document.createElement("div");
  boardListViewWriter.innerText = newBoardObject.writer;
  const boardListViewDate = document.createElement("div");
  boardListViewDate.innerText = newBoardObject.date;
  // const boardListViewCount = document.createElement("div");
  // boardListViewCount.innerText = newBoardObject.count;
  const a = document.createElement("a");
  a.href = linkWriteContent;
  const boardListViewTitle = document.createElement("div");
  boardListViewTitle.innerText = newBoardObject.title;
  boardListViewTitle.addEventListener("click", writeContents);
  if (boardListNum && boardListTitle && boardListWriter && boardListDate) {
    boardListNum.appendChild(boardListViewNum);
    boardListWriter.appendChild(boardListViewWriter);
    boardListDate.appendChild(boardListViewDate);
    boardListTitle.appendChild(a);
    a.appendChild(boardListViewTitle);
  }
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
  if (
    boardTitle &&
    boardInfoNum &&
    boardInfoWriter &&
    boardInfoDate &&
    boardContent
  ) {
    boardTitle.appendChild(title);
    boardInfoNum.appendChild(ddNum);
    boardInfoWriter.appendChild(ddWriter);
    boardInfoDate.appendChild(ddDate);
    boardContent.appendChild(ddContent);
  }

  // boardInfoViews.appendChild()
}

function writeAdd(event) {
  event.preventDefault();
  const saveTitleInput = titleInput.value;
  const saveInfoWriterInput = infoWriterInput.value;
  const saveInfoPasswordInput = infoPasswordInput.value;
  const saveContentInfo = contentInfo.value;
  titleInput.value = "";
  infoWriterInput.value = "";
  infoPasswordInput.value = "";
  contentInfo.value = "";
  const newBoardObject = {
    id: boardData.length + 1,
    title: saveTitleInput,
    num: boardData.length + 1,
    writer: saveInfoWriterInput,
    password: saveInfoPasswordInput,
    content: saveContentInfo,
    date: date,
  };
  boardData.push(newBoardObject);
  boardLists(newBoardObject);
  writeContents(newBoardObject);
  location.href = linkBoardList;

  saveBoardData();
}

boardWriteForm.addEventListener("submit", writeAdd);

const savedBoardData = localStorage.getItem(BOARD_LISTS);

if (savedBoardData !== null) {
  const parsedBoardData = JSON.parse(savedBoardData);
  boardData = parsedBoardData;
  parsedBoardData.forEach(boardLists);
}
