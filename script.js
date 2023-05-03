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

let date = new Date();
console.log(date.monthCheck);

function changeColors() {
    for(let i = 0; i < global.length; i++) {
        global[i].style.border = "1.5px solid hsl(0, 100%, 67%)";
        titleTxt[i].style.color = "hsl(0, 100%, 67%)";
    }
}

function checkForErrors() {
    alert("da");
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
    } 
    else if(dayCheck > 31) {
        isEverythingAllRight = false;
        dayErr.innerHTML = "Must be a valid day";
    } 
    else if(dayCheck > month) {
        isEverythingAllRight = false;
        changeColors();
        dayErr.innerHTML = "Must be a valid date";
    } 
    if(yearCheck >= date.getFullYear()) {
        isEverythingAllRight = false;
        yearErr.innerHTML = "Must be in the past";
    } 

    if(isEverythingAllRight) lifeResult();
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
    else if(parseInt(bornMonth) > (currentMonth + 1) /*|| parseInt(bornDay) > currentDay*/) monthsCorrector = (12 - parseInt(bornMonth) + currentMonth + 1); 
    else if(parseInt(bornMonth) < (currentMonth + 1) /*|| parseInt(bornDay) < currentDay*/) monthsCorrector = (currentMonth + 1) - parseInt(bornMonth);
    console.log("monthes " + monthsCorrector);
    console.log();
}

function calculationOfDayLife() {
    let bornDay = dayInf.value;
    let currentDay = date.getDate();
    monthCheckForNow++;
    monthCorrector();
    if(parseInt(bornDay) >= currentDay) dateCorrector = (month + currentDay) - bornDay;
    else if(parseInt(bornDay) < currentDay) dateCorrector = currentDay - bornDay;
    console.log("Days of life " + dateCorrector);
}

function calculationOfThisYear() {
    monthCheckForNow = date.getMonth();
    monthCorrector();
    currentDate = parseInt((date.getFullYear()) * 365) + parseInt(monthCounter) + (date.getDate());
    console.log("this year " + date.getFullYear() * 365);
    console.log("monthcounter " + monthCounter);
    console.log("current day " + date.getDate());
    console.log("current date" + currentDate);
}

function calculationOfInformation() {
    monthCorrector();
    wasBorne = parseInt((yearInf.value) * 365) + parseInt(monthCounter) - parseInt(month) + parseInt(dayInf.value); 
    console.log("wasborn " + wasBorne);
    isInformationColculated = true;
}

function lifeResult() {
    correctorOfLifeTime();
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
    console.log("days of life " + resultOfLife);
}

function Check() {
    monthCorrector();
    console.log(parseInt(yearInf.value));
    console.log(parseInt(monthCounter));
    // console.log(month);
    // console.log(dayInf.value);
    console.log(parseInt(month - dayInf.value));
}



// год рождения 732190 + месяцы 9 + дни 5 = 732467

// 31+28+31+30+31+30+31+31+30+5 = ( 31 * 5 ) + (30 * 3) + 28 + 5 = 155 + 90 + 32 = 277   


// этот год 738397 + (31+28+31+28 = 62 + 56 = 118) = 738515

// 732468 - 738515 = 6048

// 732 494   26






// 738395 this year + 90 + 29 



//26


//счет месяцев
// с 5окт до 5нояб = 31дней(1месяц), c 5нояб до 5дек = 30дней(2месяц), 
// с 5дек до 5янв = 31дней(3месяц), 5янв до 5фев = 31дней(4месяц), 5фев до 5марта = 28дней(4месяц), 5марта до 5апр = 31дней(5месяц)

// b = 10, n = 3;

//m = 12, m - b = 2 + n = 5;

// b = 5, n = 5
// 12 - 5 = 6+3=9

// если месяц моего рождения меньше текущего месяца то (n - b)
// если наоборот то (12-b+n)
//