let simpleRunTime = document.querySelector('.simple-time'),
    eachRunSplit = document.querySelector('.each-split'),
    startPauseBtn = document.getElementById('start-pause-btn'),
    splitBtn = document.getElementById('split-btn'),
    resetBtn = document.getElementById('reset-btn');


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

let dut = new SplitViewer('00:02:54:00', 0);
let dfg = new SplitViewer('00:07:54:00', 5);
let dafg = new SplitViewer('00:07:54:00', 9);
let daefg = new SplitViewer('00:07:54:00', 10);

startPauseBtn.addEventListener('click', function(e) {
    splitBtn.classList.remove('display-none-class');
    resetBtn.classList.remove('display-none-class');
    e.target.innerHTML = 'Pause';
    let startDate = new Date();
    setInterval(function() {
        let currentDate = new Date(),
            resultTime = currentDate - startDate;
            simpleRunTime.innerHTML = `${(resultTime%3600000-resultTime%60000)/60000}:${(resultTime%60000-resultTime%1000)/1000}:${resultTime%1000}`;
            eachRunSplit.innerHTML = simpleRunTime.innerHTML;
            e.target.addEventListener('click', function() {
        
            });
    }, 1);


});