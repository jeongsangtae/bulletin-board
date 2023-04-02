const boardWriteForm = document.querySelector(".main-container");

const boardListTable = document.querySelector("#board-list-table");

const boardListTop = document.querySelector(".board-top");

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

const boardTitleEditInput = document.querySelector("#board-title-edit-input");
const infoWriterEditInput = document.querySelector("#info-writer-edit-input");
const infoPasswordEditInput = document.querySelector(
  "#info-password-edit-input"
);
const contentInfoEditInput = document.querySelector("#content-info-edit-input");

const btnWrapEdit = document.querySelector("#btn-wrap-edit");
const btnEditPage = document.querySelector("#btn-editpage");

const BOARD_LISTS = "boardlists";
const PAGE_SIZE = 5;
let boardData = [];
let currentPage = 1;
let date = new Date(); // 현재 시간
let num = 1;
let count = 0;
let linkBoardList = "index.html";
let linkWriteContent = "write-content.html";
let linkWriteEdit = "write-edit.html";

date = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

// localStorage에 배열을 만들어서 데이터를 저장
function saveBoardData() {
  localStorage.setItem(BOARD_LISTS, JSON.stringify(boardData));
}

// localStorage에 저장된 데이터를 가져와 게시판 목록에 보여주는 역할을 한다.
// 그리고 보고싶은 게시물의 제목을 클릭하면 그 해당 내용을 보여주는 페이지로 이동한다.
function boardLists(newBoardObject) {
  const startPage = (currentPage - 1) * PAGE_SIZE;
  const endPage = startPage + PAGE_SIZE;
  if (
    boardListTable !== null &&
    newBoardObject.num > startPage &&
    newBoardObject.num <= endPage
  ) {
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

// 페이지 번호와 next prev를 보여주는 함수
function renderPageNumbers() {
  // 기존 페이지 버튼들 삭제
  while (boardListPage.firstChild) {
    boardListPage.removeChild(boardListPage.firstChild);
  }

  const btnPrevPage = document.createElement("a");
  btnPrevPage.classList.add("first");
  btnPrevPage.innerText = "<";
  btnPrevPage.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      boardListTable.innerHTML = "";
      boardData.forEach(boardLists);

      if (boardContentView) {
        boardContentView.innerHTML = "";
      }

      writeContents(boardData[0]); // 첫 번째 게시물을 보여준다.
      renderPageNumbers(); // 페이지 번호를 다시 보여준다.
    }
  });
  boardListPage.appendChild(btnPrevPage);

  const totalPages = Math.ceil(boardData.length / PAGE_SIZE);

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.classList.add("btn");
    pageLink.classList.add("btn-num");
    pageLink.innerText = i;
    pageLink.dataset.page = i;

    if (i === currentPage) {
      pageLink.classList.add("on");
    }

    pageLink.addEventListener("click", () => {
      currentPage = i;
      boardListTable.innerHTML = "";
      boardData.forEach(boardLists);

      if (boardContentView) {
        boardContentView.innerHTML = "";
      }

      writeContents(boardData[0]);
      renderPageNumbers();

      const pageLinks = boardListPage.querySelectorAll(".btn-num");
      pageLinks.forEach((link) => {
        link.classList.remove("on");
      });

      //현재 페이지와 일치하는 버튼에 on 클래스 추가
      const currentPageBtn = boardListPage.querySelector(
        `.btn-num[data-page='${currentPage}']`
      );
      currentPageBtn.classList.add("on");
    });

    boardListPage.appendChild(pageLink);
  }
  const btnNextPage = document.createElement("a");
  btnNextPage.classList.add("next");
  btnNextPage.innerText = ">";
  btnNextPage.addEventListener("click", () => {
    const totalPages = Math.ceil(boardData.length / PAGE_SIZE);
    if (currentPage < totalPages) {
      currentPage++;
      boardListTable.innerHTML = "";
      boardData.forEach(boardLists);

      if (boardContentView) {
        boardContentView.innerHTML = "";
      }

      writeContents(boardData[0]);
      renderPageNumbers();
    }
  });

  boardListPage.appendChild(btnNextPage);
}

// 게시글 클릭시 해당 내용이 보여진다.
function writeContents(newBoardObject) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = parseInt(urlParams.get("id"));
  const selectedBoard = boardData.find(
    (newBoardObject) => newBoardObject.id === id
  );
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

    btnEditPage.addEventListener("click", (event) => {
      event.preventDefault();
      const queryString = `?id=${newBoardObject.id}`;
      window.location.href = `${linkWriteEdit}${queryString}`;
      // writeContentsEdit(selectedBoard);
    });
  }
}

// 해당 게시물의 내용을 받아와 화면에 표시한다.
function writeContentsEdit() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = parseInt(urlParams.get("id"));
  const selectedBoard = boardData.find(
    (newBoardObject) => newBoardObject.id === id
  );
  if (
    boardTitleEditInput &&
    infoWriterEditInput &&
    infoPasswordEditInput &&
    contentInfoEditInput
  ) {
    boardTitleEditInput.value = selectedBoard.title;
    infoWriterEditInput.value = selectedBoard.writer;
    infoPasswordEditInput.value = selectedBoard.password;
    contentInfoEditInput.value = selectedBoard.content;
  }
}

// function editContents(event) {
//   event.preventDefault();
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const id = parseInt(urlParams.get("id"));
//   const selectedBoardIndex = boardData.findIndex(
//     (newBoardObject) => newBoardObject.id === id
//   );
//   if (
//     boardTitleEditInput &&
//     infoWriterEditInput &&
//     infoPasswordEditInput &&
//     contentInfoEditInput
//   ) {
//     const saveTitleInput = boardTitleEditInput.value;
//     const saveInfoWriterInput = infoWriterEditInput.value;
//     const saveInfoPasswordInput = infoPasswordEditInput.value;
//     const saveContentInfo = contentInfoEditInput.value;
//     boardData[selectedBoardIndex].title = saveTitleInput;
//     boardData[selectedBoardIndex].writer = saveInfoWriterInput;
//     boardData[selectedBoardIndex].password = saveInfoPasswordInput;
//     boardData[selectedBoardIndex].content = saveContentInfo;
//     saveBoardData();
//     location.href = `${linkWriteContent}?id=${id}`;
//   }
// }

// if (editForm) {
//   writeContentsEdit();
//   editForm.addEventListener("submit", editContents);
// }

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
  location.href = location.replace(linkBoardList);

  saveBoardData();
}

boardWriteForm.addEventListener("submit", writeAdd);

const savedBoardData = localStorage.getItem(BOARD_LISTS);

if (savedBoardData !== null) {
  const parsedBoardData = JSON.parse(savedBoardData);
  boardData = parsedBoardData;
  // num을 기준으로 내림차순 정렬
  boardData.sort((a, b) => b.num - a.num);
  parsedBoardData.forEach(boardLists);
  parsedBoardData.forEach(writeContents);

  renderPageNumbers();
}
