const boardWriteForm = document.querySelector(".board-write-container");

// const boardWriteInput = document.querySelector(
//   ".board-write input, .board-write textarea"
// );
const titleInput = document.querySelector("#title-input");
const infoWriterInput = document.querySelector("#info-writer");
const infoPasswordInput = document.querySelector("#info-password");
const contentInfo = document.querySelector("#content-textarea");

const btnAdd = document.querySelector(".btn-add");

const BOARD_LISTS = "boardlists";
let boardData = [];
let date = new Date(); // 현재 시간
const utcNow = date.getTime() + date.getTimezoneOffset() * 60 * 1000; // 현재 시간을 utc로 변환한 밀리세컨드값
const koreaTime = 9 * 60 * 60 * 1000; // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
const koreaNow = new Date(utcNow + koreaTime); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

let month = date.getUTCMonth() + 1; //months from 1-12
let day = date.getUTCDate();
let year = date.getUTCFullYear();

date = year + "." + month + "." + day;

function dates() {
  console.log(date);
  console.log(koreaNow);
}

btnAdd.addEventListener("click", dates);

function saveBoardData() {
  localStorage.setItem(BOARD_LISTS, JSON.stringify(boardData));
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
    writer: saveInfoWriterInput,
    password: saveInfoPasswordInput,
    content: saveContentInfo,
    date: date,
  };
  boardData.push(newBoardObject);
  saveBoardData(boardListView);
}

boardWriteForm.addEventListener("submit", writeAdd);

if (saveBoardData !== null) {
  const parsedBoardData = JSON.parse(saveBoardData);
  boardData = parsedBoardData;
  parsedBoardData.forEach(boardListView);
}
