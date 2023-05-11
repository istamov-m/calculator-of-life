let yearInf = document.getElementById('year-info');
let monthInf = document.getElementById('month-info');
let dayInf = document.getElementById('day-info');

let yearRes = document.getElementById('years-result');
let monthRes = document.getElementById('months-result');
let dayRes = document.getElementById('days-result');

let global = document.getElementsByClassName("info");
let errorTxt = document.getElementsByClassName("error");
let titleTxt = document.getElementsByClassName("title");

let yearErr = document.getElementById('year-error'); 
let monthErr = document.getElementById('month-error');
let dayErr = document.getElementById('day-error');

let month = 0;
let monthCounter = 0;
let monthCheck = 0;
let monthCheckForNow = 0;
let monthsCorrector = 0;

let dateCorrector = 0;

let wasBorne = 0;
let currentDate = 0;

let isInformationColculated = false;

let resultOfLife = 0;

const date = new Date();

function checkForErrors() {
    
    let dayCheck = dayInf.value;
    let monthCheck = monthInf.value;
    let yearCheck = yearInf.value;

    let isEverythingAllRight = true;

    for(let i = 0; i < global.length; i++) {
        if(global[i].value == "") {
            
            global[i].style.border = "1.5px solid hsl(0, 100%, 67%)";
            errorTxt[i].innerHTML = "This field is required";
            titleTxt[i].style.color = "hsl(0, 100%, 67%)";
            isEverythingAllRight = false;
        }
        else if(global[i].value != "") {
            global[i].style.border = "1.5px solid hsl(0, 0%, 86%)";
            errorTxt[i].innerHTML = "";
            titleTxt[i].style.color = "hsl(0, 1%, 44%)";
        }
    }

    monthCorrector();
    if(monthCheck > 12) {
        isEverythingAllRight = false;
        monthErr.innerHTML = "Must be a valid month";
        monthInf.style.border = "1.5px solid hsl(0, 100%, 67%)";
        titleTxt[1].style.color = "hsl(0, 100%, 67%)";
    } 
    else if(dayCheck > 31) {
        isEverythingAllRight = false;
        dayErr.innerHTML = "Must be a valid day";
        dayInf.style.border = "1.5px solid hsl(0, 100%, 67%)";
        titleTxt[0].style.color = "hsl(0, 100%, 67%)";
    } 
    else if(dayCheck > month) {
        isEverythingAllRight = false;
        for(let i = 0; i < global.length; i++) {
            global[i].style.border = "1.5px solid hsl(0, 100%, 67%)";
            titleTxt[i].style.color = "hsl(0, 100%, 67%)";
        }
        dayErr.innerHTML = "Must be a valid date";
    } 
    if(yearCheck >= date.getFullYear()) {
        isEverythingAllRight = false;
        yearErr.innerHTML = "Must be in the past";
        yearInf.style.border = "1.5px solid hsl(0, 100%, 67%)";
        titleTxt[2].style.color = "hsl(0, 100%, 67%)";
    } 

    if(isEverythingAllRight) correctorOfLifeTime();
}

function monthCorrector() {
    if(isInformationColculated) {
        monthCheck = monthCheckForNow;
    }
    else if(!isInformationColculated){
        monthCheck = monthInf.value;
    }


    if(monthCheck == "01" || monthCheck == "1") {
        month = 31;
        monthCounter = 31; // 31
    }
    else if(monthCheck == "02" || monthCheck == "2") {
        month = 28;
        monthCounter = 59; // 28
    }
    else if(monthCheck == "03" || monthCheck == "3") {
        month = 31;
        monthCounter = 90; // 31
    }
    else if(monthCheck == "04" || monthCheck == "4") {
        month = 30;
        monthCounter = 120; // 30
    } 
    else if(monthCheck == "05" || monthCheck == "5") {
        month = 31;
        monthCounter = 151; // 31
    }
    else if(monthCheck == "06" || monthCheck == "6") {
        month = 30;
        monthCounter = 181; // 30
    }
    else if(monthCheck == "07" || monthCheck == "7") {
        month = 31;
        monthCounter = 212; // 31
    }
    else if(monthCheck == "08" || monthCheck == "8") {
        month = 31;
        monthCounter = 243; // 31
    }
    else if(monthCheck == "09" || monthCheck == "9") {
        month = 30;
        monthCounter = 273; // 30
    }
    else if(monthCheck == "10") {
        month = 31;
        monthCounter = 304; // 31
    }
    else if(monthCheck == "11") {
        month = 30;
        monthCounter = 334; // 30
    }
    else if(monthCheck == "12") {
        month = 31;
        monthCounter = 365; // 31
    }
}

function calculationOfMonthLife() {
    let currentMonth = date.getMonth();
    let currentDay = date.getDate();
    let bornMonth = monthInf.value;
    let bornDay = dayInf.value;
    if(parseInt(bornMonth) == (currentMonth + 1) && parseInt(bornDay) > currentDay) monthsCorrector = (12 - parseInt(bornMonth) + currentMonth + 1);
    else if(parseInt(bornMonth) > (currentMonth + 1)) monthsCorrector = (12 - parseInt(bornMonth) + currentMonth + 1); 
    else if(parseInt(bornMonth) < (currentMonth + 1)) monthsCorrector = (currentMonth + 1) - parseInt(bornMonth);
}

function calculationOfDayLife() {
    let bornDay = dayInf.value;
    let currentDay = date.getDate();
    monthCheckForNow++;
    monthCorrector();
    if(parseInt(bornDay) >= currentDay) dateCorrector = (month + currentDay) - bornDay;
    else if(parseInt(bornDay) < currentDay) dateCorrector = currentDay - bornDay;
}

function calculationOfThisYear() {
    monthCheckForNow = date.getMonth();
    monthCorrector();
    currentDate = parseInt((date.getFullYear()) * 365) + parseInt(monthCounter) + (date.getDate());

}

function calculationOfInformation() {
    monthCorrector();
    wasBorne = parseInt((yearInf.value) * 365) + parseInt(monthCounter) - parseInt(month) + parseInt(dayInf.value); 
    isInformationColculated = true;
}

function correctorOfLifeTime() {
    calculationOfInformation();
    calculationOfThisYear();
    calculationOfMonthLife();
    calculationOfDayLife();
    resultOfLife = parseInt(currentDate) - parseInt(wasBorne); 
    yearRes.innerHTML = Math.floor(parseInt(resultOfLife / 365));
    monthRes.innerHTML = monthsCorrector;
    dayRes.innerHTML = dateCorrector;
    isInformationColculated = false;
}
