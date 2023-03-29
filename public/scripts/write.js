const boardWriteForm = document.querySelector(".main-container");

const boardListTable = document.querySelector("#board-list-table");

const boardListPage = document.querySelector("#board-list-page");

const boardContentView = document.querySelector("#board-view-content");

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
const PAGE_SIZE = 5;
let boardData = [];
let currentPage = 1;
let date = new Date(); // 현재 시간
let num = 1;
let count = 0;
let linkBoardList = "index.html";
let linkWriteContent = "write-content.html";

date = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

// localStorage에 배열을 만들어서 데이터를 저장
function saveBoardData() {
  localStorage.setItem(BOARD_LISTS, JSON.stringify(boardData));
}

// localStorage에 저장된 데이터를 가져와 게시판 목록에 보여주는 역할을 한다.
// 그리고 보고싶은 게시물의 제목을 클릭하면 그 해당 내용을 보여주는 페이지로 이동한다.
function boardLists(newBoardObject) {
  if (boardListTable !== null) {
    const boardListViewTable = document.createElement("div");
    boardListViewTable.classList.add("board-list-view-table");
    boardListViewTable.id = newBoardObject.id;

    const boardListViewNum = document.createElement("div");
    boardListViewNum.classList.add("board-num");
    boardListViewNum.innerText = newBoardObject.num;

    const boardListViewWriter = document.createElement("div");
    boardListViewWriter.classList.add("board-writer");
    boardListViewWriter.innerText = newBoardObject.writer;

    const boardListViewDate = document.createElement("div");
    boardListViewDate.classList.add("board-date");
    boardListViewDate.innerText = newBoardObject.date;

    const boardListViewCount = document.createElement("div");
    boardListViewCount.classList.add("board-count");
    boardListViewCount.innerText = newBoardObject.count;

    const boardListViewTitle = document.createElement("div");
    boardListViewTitle.classList.add("board-title");
    const a = document.createElement("a");
    a.classList.add("board-a");
    a.innerText = newBoardObject.title;

    boardListViewTitle.appendChild(a);

    // 클릭시 조회수가 증가하는 로직 (arrow function 사용)
    if (newBoardObject.count >= 0) {
      a.addEventListener("click", () => {
        //URL 쿼리스트링 생성
        const queryString = `?id=${newBoardObject.id}`;
        window.location.href = `${linkWriteContent}${queryString}`;
        newBoardObject.count++;
        saveBoardData();
        writeContents(newBoardObject);
      });
    }

    boardListViewTable.appendChild(boardListViewNum);
    boardListViewTable.appendChild(boardListViewTitle);
    boardListViewTable.appendChild(boardListViewWriter);
    boardListViewTable.appendChild(boardListViewDate);
    boardListViewTable.appendChild(boardListViewCount);

    boardListTable.appendChild(boardListViewTable);
  }
}

// 게시글 클릭시 그 내용이 보여지는 곳
function writeContents(newBoardObject) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = parseInt(urlParams.get("id"));
  const selectedBoard = boardData.find((board) => board.id === id);
  if (
    boardTitle &&
    boardInfoNum &&
    boardInfoWriter &&
    boardInfoDate &&
    boardInfoViews &&
    boardContent
  ) {
    boardTitle.innerText = selectedBoard.title;
    boardInfoNum.innerText = selectedBoard.num;
    boardInfoWriter.innerText = selectedBoard.writer;
    boardInfoDate.innerText = selectedBoard.date;
    boardInfoViews.innerText = selectedBoard.count;
    boardContent.innerText = selectedBoard.content;
  }
}

// form안에 있는 input들을 가져와 내용을 작성하면 그걸 localStorage의 배열에 객체형식으로 저장한다.
// 데이터가 저장되면 메인 페이지 즉, 게시글 목록이 있는 곳으로 돌아가도록 되어있다.
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
    count: count,
  };
  boardData.push(newBoardObject);
  boardLists(newBoardObject);
  writeContents(newBoardObject);
  location.href = linkBoardList;

  saveBoardData();
}

boardWriteForm.addEventListener("submit", writeAdd);

// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get("id");

const savedBoardData = localStorage.getItem(BOARD_LISTS);

if (savedBoardData !== null) {
  const parsedBoardData = JSON.parse(savedBoardData);
  boardData = parsedBoardData;
  // num을 기준으로 내림차순 정렬
  boardData.sort((a, b) => b.num - a.num);
  parsedBoardData.forEach(boardLists);
  parsedBoardData.forEach(writeContents);
}
