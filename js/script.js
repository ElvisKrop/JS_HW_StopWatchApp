let simpleRunTime = document.querySelector('.simple-time'),
    eachRunSplit = document.querySelector('.each-split'),
    tableOfSplits = document.querySelector('.splits-table'),
    startPauseBtn = document.getElementById('toggle-btn'),
    splitBtn = document.getElementById('split-btn'),
    resetBtn = document.getElementById('reset-btn'),
    millis = 0,
    sec = 0,
    minutes = 0,
    memory = '',
    globalId;



function timerOutStart (){
    millis++;
    if(millis >= 100) {
        sec++;
        millis -= 100;
    }

    if(sec >= 60) {
        minutes++;
        sec -= 60;
    }

    if(millis < 10) {
        millis = '0' + millis;
    } else millis += '';
    
    if(sec.toString().length <= 1) sec = '0' + sec;
    else sec += '';   
    
    if(minutes.toString().length <= 1) minutes = '0' + minutes;
    else minutes += '';
    eachRunSplit.innerHTML = `${minutes}:${sec}:${millis}`;
    simpleRunTime.innerHTML = `${minutes}:${sec}:${millis}`;
    globalId = setTimeout(timerOutStart, 9);

}

startPauseBtn.addEventListener('click', function(e) {
    
    if(e.target.classList.contains('start')) {
        e.target.classList.remove('start');
        e.target.classList.add('pause');
        splitBtn.classList.remove('display-none-class');
        e.target.innerHTML = 'Pause';

        timerOutStart();

    } else {
        clearTimeout(globalId);

        e.target.classList.remove('pause');
        e.target.classList.add('start');
        e.target.innerHTML = 'Start';
        resetBtn.classList.remove('display-none-class');
    }
});

resetBtn.addEventListener('click', function() {
    for (let i = 1; i < tableOfSplits.childNodes.length; i++){
        tableOfSplits.children[0].remove();
    }
// при нажатии чистим tableOfSplits от дочерних и обнуляем счетчики
});

// функция конструктор для отображения кругов в колонке справа
function SplitViewer(date, index) {
    let eachSplit = document.createElement('div'),
        splitsTable = document.querySelector('.splits-table'),
        spanTime = document.createElement('span');
    
    eachSplit.classList.add('each-split');

    if(index < 10) {
        eachSplit.innerHTML = `#${index + 1} `;
        spanTime.innerHTML = date;
        eachSplit.appendChild(spanTime);
    } else eachSplit.innerHTML = `Please stop!`;
    
    splitsTable.appendChild(eachSplit);
}