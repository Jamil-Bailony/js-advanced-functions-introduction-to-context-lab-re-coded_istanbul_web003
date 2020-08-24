function createEmployeeRecord(record) {
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}   

function createEmployeeRecords(records) {
    return records.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(employeeRecord, dateString) {
    // const LAST_TWO_DIGITS = /(?<mints>\d{2}$)/gi;
    // let parsedDate = new Date(date.replace(LAST_TWO_DIGITS, ':$<mints>'));
    let date = dateString.split(' ');

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(date[1]),
        date: date[0]
    }
    
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateString) {
    let date = dateString.split(' ');

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(date[1]),
        date: date[0]
    }
    
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(timeInEvent => timeInEvent.date === date);
    const timeIn = timeInEvent.hour / 100;

    const timeOutEvent = employeeRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date);
    const timeOut = timeOutEvent.hour / 100;

    return timeOut - timeIn;
}


function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payPerHour = employeeRecord.payPerHour;

    return hoursWorked * payPerHour;
}

function allWagesFor(employeeRecord) {
    console.log(employeeRecord.timeOutEvents);
    return employeeRecord.timeOutEvents.reduce((total, currentEvent) => {
        return wagesEarnedOnDate(employeeRecord, currentEvent.date) + total;
    }, 0)
}

function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find(record => record.firstName === firstName);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, currentRecord) => allWagesFor(currentRecord) + total, 0)
}