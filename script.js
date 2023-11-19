// get reference of the div having class name "active-timers"
const activeTimers = document.getElementById("active-timers");

// get a reference of the set button
const startTimerButton = document.getElementById("set-btn");

// initialize a flag to track wheather a timer is active or not
let isTimerActive = false;

// get a reference of the message "You have no timers currently!"
const msg = document.getElementById("message");

// add a click event listener to the set button
startTimerButton.addEventListener("click", ()=>{
    // parse the input values for hrs, mins and sec
    const hrs = parseInt(document.getElementById("hrs").value) || 0;
    const mins = parseInt(document.getElementById("mins").value) || 0;
    const sec = parseInt(document.getElementById("sec").value) || 0;

    // calculate the total time in seconds
    const totalSec = hrs*3600 + mins*60 + sec;

    if(totalSec>0){
        // remove the message "You have no timers currently!"
        msg.style.display = "none";

        // create new timer
        createTimer(totalSec);

        // set the flag for active timers
        isTimerActive = true;
    }else{
        alert("Please enter a valid input!");
    }
});

// function to format time in hh:mm:ss format
function formatTime(seconds){
    const h = Math.floor(seconds/3600);
    const m = Math.floor((seconds % 3600)/ 60);
    const s = seconds % 60;

    return `${h.toString().padStart(2, '0')} hr : ${m.toString().padStart(2, '0')} min : ${s.toString().padStart(2, '0')} sec`;
}

// function to create new timer
function createTimer(totalSec){
    const timerContainer = document.createElement("div");
    timerContainer.classList.add("timer-container");

    // create an element to display "Time Left"
    const timeLeftEle = document.createElement("div");
    timeLeftEle.classList.add("time-left");
    timeLeftEle.innerText = "Time Left :";

    // create an element to display timer value
    const timerEle = document.createElement("div");
    timerEle.classList.add("timer");

    // create delete button
    const deleteButton = document.createElement("button");
    deleteButton.id = "delete-btn";
    deleteButton.innerText = "Delete";

    let timerInterval;

    // function to update the timer display
    function updateTimerDisplay(){
        totalSec--;
        if(totalSec <= 0){
            clearInterval(timerInterval);
            timerEle.classList.add("timer-ended");
            deleteButton.classList.add("stop-btn");
            timeLeftEle.style.display = "none";
            timerEle.innerText = "Timer Is Up !";
            timerContainer.style.background = "#f0f757";
            deleteButton.innerText = "Stop";
            
            // play audio alert when timer ends
            playAudioAlert();
        }else{
            timerEle.textContent = formatTime(totalSec);
        }
    }

    // add event listener to the delete button
    deleteButton.addEventListener("click", () => {
        // stop the timer and remove the timer container
        clearInterval(timerInterval);
        timerContainer.remove();
        // reset the active timer flag
        isTimerActive = false;
        //check if there is no timer left, then display the message "You have no timers currently!"
        if(activeTimers.children.length === 0){
            msg.style.display = "inline";
        }
    });

    // start the timer
    timerInterval = setInterval(updateTimerDisplay, 1000);

    // append timer elements to the timer container
    timerContainer.appendChild(timeLeftEle);
    timerContainer.appendChild(timerEle);
    timerContainer.appendChild(deleteButton);

    // append the timer container to the activeTimers element
    activeTimers.appendChild(timerContainer);
}    

//function to play audio
function playAudioAlert(){
    const audio = new Audio("./alert.wav");
    audio.play();
}
