/**
    Author: Hui Jiang
    Date: 12-04-2018
**/

main();


// FIND ONE DAY AFTER THE START DATE UNITL MEETS THE END DATE
function main() {
    // OBTIAN AN ARRAY OF START AND END DATES
    var startDate = findStartAndEndDate()[0];
    var endDate = findStartAndEndDate()[1];
    // var start = formatDate(findStartAndEndDate()[0]);
    // var end = formatDate();

    var listOfDates = [];
    listOfDates.push(formatDate(startDate));

    var year = parseInt(startDate.split("-")[0]);
    var month = parseInt(startDate.split("-")[1]);
    var date = parseInt(startDate.split("-")[2]);

    do {
        var nextDate = findNdaysAfter(year, month, date, 1);
        year = parseInt(nextDate.split("-")[0]);
        month = parseInt(nextDate.split("-")[1]);
        date = parseInt(nextDate.split("-")[2]);
        listOfDates.push(formatDate(nextDate));
    } while (nextDate != endDate);
     //console.log(listOfDates);
    // return listOfDates;
    module.exports = listOfDates;
}


//HELPER FUNCTION FOR MAMIN - FORMATTING DATA
function formatDate(date) {
    var arr = date.split("-");
    for (var i = 1; i < arr.length; i++) {
        if (arr[i].length === 1) {
            arr[i] = "0" + arr[i];
        }
    }

    return date = arr[0] + "-" + arr[1] + "-" + arr[2];
}


// NO.1  - FIND START AND END DATE
function findStartAndEndDate() {
    return [dayOfLastWeek(1), dayOfLastWeek(0)];
}


// NO.2 - FIND N DAYS AFTER ONE DATE
function findNdaysAfter(year, month, date, ndays) {
    if (monthOf31) {
        if (month === 12) {
            year += 1;
            month = 1;
        }
        date = dealWithOverflow(date, ndays, 31);
        return year + "-" + month + "-" + date;
    } else if (month === 2) {
        date = dealWithOverflow(date, ndays, 28);
        return year + "-" + month + "-" + date;
    } else {
        date = dealWithOverflow(date, ndays, 30);
        return year + "-" + month + "-" + date;
    }
}


// HELPER FUNCTION FOR NO.2
function dealWithOverflow(date, ndays, limit) {
    if (date + ndays > limit) {
        date = date + ndays - limit;
    } else {
        date += ndays;
    }
    return date;
}


// HELPER FUNCTION FOR NO.1
function dayOfLastWeek(target) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    var day = today.getDay();

    if (target === day) {
        return nDaysAgo(year, month, date, 7);
    } else if (target === 1) {
        var diff = Math.abs(target - day);
        var result = nDaysAgo(year, month, date, diff);
        year = result.split("-")[0];
        month = result.split("-")[1];
        date = result.split("-")[2];
        return nDaysAgo(year, month, date, 7);
    } else if (target === 0) {
        var diff = Math.abs(target - day);
        return nDaysAgo(year, month, date, diff);
    }

}


//to test 31 days or 30 days this month
function monthOf31(month) {
    var thirtyOne = {
        "3": true,
        "5": true,
        "7": true,
        "8": true,
        "10": true,
        "12": true
    };
    var thirty = {
        "4": false,
        "6": false,
        "9": false,
        "11": false
    };
    if (thiryOne[month.toString()]) {
        return true;
    } else {
        return false;
    }
}


//HELPER FUNCITON FOR NO.1
function nDaysAgo(year, month, date, ndays) {
    if (date <= ndays) {
        if (month === 1) {
            year -= 1;
            month = 12;
            date = 30 - ndays + date;
        } else if (month === 2) {
            month = 1;
            date = 28 - ndays + date;
        } else {
            month -= 1;
            if (monthOf31) {
                date = 31 - ndays + date;
            } else {
                date = 30 - ndays + date;
            }
        }
    } else {
        date -= ndays;
    }
    return year + "-" + month + "-" + date;
}