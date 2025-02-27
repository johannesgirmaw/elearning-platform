import { changeDuration, extractTime } from "./modal";

export const toDateAndTime=(date?:Date| string): string=>{
    return date ? new Date(date.toString()).toLocaleString("en-US",{dateStyle:'medium',timeStyle:'medium'}) : "";
}

export const toDate = (date?: Date | string): string =>{
    return date ? new Date(date.toString()).toLocaleString('en-US',{dateStyle:'medium'}) : ""
}

export const toTime = (date?: Date | string): string =>{
    return date ? new Date(date.toString()).toLocaleString('en-US', { timeStyle: 'short'}) : "";
}

export const toDurationTime = (duration: string) => {
    let y = changeDuration(duration)
    return `${y.days ? y.days + ' Days and': ''} ${extractTime(duration)}`
}

export const toTimestamp=(date?:Date)=>{
    return date?date.getTime()/1000:new Date().getTime()/1000;
}

export const dateDifferences=(startDate:Date,endDate:Date)=>{
    return toTimestamp(endDate)-toTimestamp(startDate);
}

export const yearDifferences=(startDate:Date,endDate:Date)=>{
    return Math.round((dateDifferences(startDate,endDate)/(365*24*60*60) + Number.EPSILON) * 100) / 100;
}

export const convertDateString = (inputDateString: string): string => {
    // Parse the input date string
    const inputDate: Date = new Date(inputDateString);

    // Get the components of the adjusted date
    const year: number = inputDate.getFullYear();
    const month: string = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day: string = inputDate.getDate().toString().padStart(2, '0');
    const hours: string = inputDate.getHours().toString().padStart(2, '0');
    const minutes: string = inputDate.getMinutes().toString().padStart(2, '0');

    // Construct the formatted date string
    const formattedDateString: string = `${year}-${month}-${day}T${hours}:${minutes}`;

    return formattedDateString;
}

export const parseDateTime = (date: Date, timeStr: string): Date => {
    const [hourStr, minuteStr] = timeStr.split(':').map(str => parseInt(str));

    // Validate input
    if (
        isNaN(hourStr) || isNaN(minuteStr) ||
        hourStr < 0 || hourStr > 23 ||
        minuteStr < 0 || minuteStr > 59
    ) {
        console.error('Invalid input format or values');
    }

    const parsedDateTime = new Date(date);
    parsedDateTime.setHours(hourStr);
    parsedDateTime.setMinutes(minuteStr);
    return parsedDateTime;
}

export const getTimeFromDate = (givenDate: string): string => {
    const date = new Date(givenDate)
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}


export const getDatesInRange = (day: number, startTime: string, endTime: string, startDate: Date, endDate: Date): {start: Date, end: Date}[] => {
    if(day === 7){
        day = 0
    }
    const result: {start: Date, end: Date}[] = [];

    const startTimeParts = startTime.split(':').map(part => parseInt(part, 10));
    const endTimeParts = endTime.split(':').map(part => parseInt(part, 10));

    const startHour = startTimeParts[0];
    const startMinute = startTimeParts[1];

    const endHour = endTimeParts[0];
    const endMinute = endTimeParts[1];

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        if (currentDate.getDay() === day) {
            const startDateTime = new Date(currentDate);
            startDateTime.setHours(startHour);
            startDateTime.setMinutes(startMinute);

            const endDateTime = new Date(currentDate);
            endDateTime.setHours(endHour);
            endDateTime.setMinutes(endMinute);

            result.push({ start: startDateTime, end: endDateTime });
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
}

export const convertTo12HourFormat = (time24: string): string => {
    const [hours, minutes] = time24.split(':').map(Number);

    let suffix = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    let hours12 = hours % 12;
    hours12 = hours12 ? hours12 : 12; // If hours is 0, then it should be 12

    return `${hours12}:${minutes} ${suffix}`;
}


export const isEqualDate = (date1: string | Date, date2: string | Date) => {
    return new Date(date1).toISOString() === new Date(date2).toISOString();
}