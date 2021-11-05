//Collect all the Id in Variable:
let inputNames = document.getElementById("names");
let showButton = document.getElementById("show-list");
let showNameList = document.getElementById("show-names-list");
let display = document.getElementById("display");
let giveTryButton = document.getElementById("give-try");
let firstPos = document.getElementById("firstPosition");
let secondPos = document.getElementById("secondPosition");
let thirdPos = document.getElementById("thirdPosition");

const participantsName = [];

//Add EventListener with textarea's input:
inputNames.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    let newNames = event.target.value.split(", ");
    if (newNames[0] !== "") {
      newNames.forEach((singleName, index) => {
        participantsName.push(singleName);
        let items = createListItems(singleName, index + 1);
        showNameList.appendChild(items);
        event.target.value = "";
      });
    }
  }
});

//Add Event Listener with Give A Try Button:
giveTryButton.addEventListener("click", function () {
  if (participantsName.length === 0) {
    alert("You've no data entry in your textarea!");
  } else {
    let shuffleNames = shuffle(participantsName);
    for (let i = 1; i < shuffleNames.length; i++) {
      (function (i, count) {
        setTimeout(() => {
          let rand = Math.floor(Math.random() * shuffleNames.length);
          display.innerHTML = shuffleNames[rand];

          if (count === shuffleNames.length - 1) {
            if (!firstPos.innerHTML) {
              posAndRem(firstPos, shuffleNames[rand]);
            } else if (!secondPos.innerHTML) {
              posAndRem(secondPos, shuffleNames[rand]);
            } else if (!thirdPos.innerHTML) {
              posAndRem(thirdPos, shuffleNames[rand]);
            } else {
              alert("Raffle Draw is already completed!");
            }
          }
        }, i);
      })(i * 200, i);
    }
  }
});

//Add Event Listener with Show Names Button:
showButton.addEventListener("click", function () {
  showNameList.style.display = "block";
});

//Function to Create li items:
function createListItems(item, ind) {
  let li = document.createElement("li");
  li.className = "list-items";
  li.innerHTML = `${ind}. ${item}`;
  return li;
}

//Function to Shuffled Array:
function shuffle(array) {
  let shuffledArr = [...array];
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    let temp = shuffledArr[rand];
    shuffledArr[rand] = shuffledArr[i];
    shuffledArr[i] = temp;
  }
  return shuffledArr;
}

//Function to positioning the winners and remove them from Array:
function posAndRem(item, value) {
  item.innerHTML = value;
  let findIndex = participantsName.indexOf(value);
  participantsName.splice(findIndex, 1);
}
