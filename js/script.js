let simpleRunTime = document.querySelector(".simple-time"),
    eachRunSplit = document.querySelector(".each-split"),
    tableOfSplits = document.getElementsByClassName("splits-table")[0],
    startPauseBtn = document.getElementById("toggle-btn"),
    splitBtn = document.getElementById("split-btn"),
    resetBtn = document.getElementById("reset-btn"),
    splitTime = {
        millis: 0,
        sec: 0,
        minutes: 0,
    },
    globalTime = {
        millis: 0,
        sec: 0,
        minutes: 0,
    },
    globalId,
    splitId,
    counter = 0;

function resetTimeVar() {
    for (const key in splitTime) {
        splitTime[key] = 0;
    }
    for (const key1 in globalTime) {
        globalTime[key1] = 0;
    }
    counter = 0;
    startPauseBtn.classList.remove("pause");
    startPauseBtn.classList.add("start");
    startPauseBtn.innerHTML = "Start";
    resetBtn.classList.add("display-none-class");
    splitBtn.classList.add("display-none-class");

    let clildElements = tableOfSplits.getElementsByClassName("each-split");
    do {
        for (let key of clildElements) {
            tableOfSplits.removeChild(key);
        }
    } while (clildElements.length != 0);
    clearTimeout(globalId);
    clearTimeout(splitId);
    eachRunSplit.innerHTML = "00:00:00";
    simpleRunTime.innerHTML = "00:00:00";
}
resetTimeVar();

function timerClobalStart() {
    globalTime.millis++;
    if (globalTime.millis >= 100) {
        globalTime.sec++;
        globalTime.millis -= 100;
    }

    if (globalTime.sec >= 60) {
        globalTime.minutes++;
        globalTime.sec -= 60;
    }

    if (globalTime.millis < 10) {
        globalTime.millis = "0" + globalTime.millis;
    } else globalTime.millis += "";

    if (globalTime.sec.toString().length <= 1)
        globalTime.sec = "0" + globalTime.sec;
    else globalTime.sec += "";

    if (globalTime.minutes.toString().length <= 1)
        globalTime.minutes = "0" + globalTime.minutes;
    else globalTime.minutes += "";
    simpleRunTime.innerHTML = `${globalTime.minutes}:${globalTime.sec}:${globalTime.millis}`;
    globalId = setTimeout(timerClobalStart, 9);
}

function timerSplitStart() {
    splitTime.millis++;
    if (splitTime.millis >= 100) {
        splitTime.sec++;
        splitTime.millis -= 100;
    }

    if (splitTime.sec >= 60) {
        splitTime.minutes++;
        splitTime.sec -= 60;
    }

    if (splitTime.millis < 10) {
        splitTime.millis = "0" + splitTime.millis;
    } else splitTime.millis += "";

    if (splitTime.sec.toString().length <= 1)
        splitTime.sec = "0" + splitTime.sec;
    else splitTime.sec += "";

    if (splitTime.minutes.toString().length <= 1)
        splitTime.minutes = "0" + splitTime.minutes;
    else splitTime.minutes += "";
    eachRunSplit.innerHTML = `${splitTime.minutes}:${splitTime.sec}:${splitTime.millis}`;
    splitId = setTimeout(timerSplitStart, 9);
}

startPauseBtn.addEventListener("click", ({ target }) => {
    if (target.classList.contains("start")) {
        target.classList.remove("start");
        target.classList.add("pause");
        splitBtn.classList.remove("display-none-class");
        target.innerHTML = "Pause";

        timerClobalStart();
        timerSplitStart();
    } else {
        clearTimeout(globalId);
        clearTimeout(splitId);

        target.classList.remove("pause");
        target.classList.add("start");
        target.innerHTML = "Start";
        resetBtn.classList.remove("display-none-class");
    }
});

splitBtn.addEventListener("click", function (e) {
    SplitViewer(eachRunSplit.innerHTML, counter++);
    for (const key in splitTime) {
        splitTime[key] = 0;
        eachRunSplit.innerHTML = "00:00:00";
    }
});

resetBtn.addEventListener("click", resetTimeVar);

// функция конструктор для отображения кругов в колонке справа
function SplitViewer(date, index) {
    let eachSplit = document.createElement("div"),
        splitsTable = document.querySelector(".splits-table"),
        spanTime = document.createElement("span");

    eachSplit.classList.add("each-split");

    if (index < 10) {
        eachSplit.innerHTML = `#${index + 1} `;
        spanTime.innerHTML = date;
        eachSplit.appendChild(spanTime);
    } else eachSplit.innerHTML = `Please stop!`;

    splitsTable.appendChild(eachSplit);
}
