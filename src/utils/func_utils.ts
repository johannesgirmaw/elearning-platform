export const  formatBytes = (bytes:number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = parseFloat((bytes / Math.pow(k, Math.min(i, sizes.length - 1))).toFixed(dm));

    return `${value} ${sizes[i]}`;
  }

  export const calculateDateDifference = (first_date:any, second_date:any) => {
    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const millisecondsInMonth = millisecondsInDay * 30;
    const millisecondsInYear = millisecondsInDay * 365;
    const date1 = new Date(first_date)
    const date2 = new Date(second_date)
    const differenceInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
  
    const years = Math.floor(differenceInMilliseconds / millisecondsInYear);
    const months = Math.floor((differenceInMilliseconds % millisecondsInYear) / millisecondsInMonth);
    const days = Math.floor((differenceInMilliseconds % millisecondsInMonth) / millisecondsInDay);
  if (years > 0) {
    if (months > 0) {
      return `${years} ${years>1?"years":"year"} ${months} ${months>1?"months":"month"} and ${date2.getDate()} ${date2.getDate()>1?"days":"day"}`;
    } else {
      return `${years} ${years>1?"years":"year"} and ${date2.getDate()} ${date2.getDate()>1?"days":"day"}`;
    }
  } else if (months > 0) {
    return `${months} ${months>1?"months":"month"} and ${date2.getDate()} ${date2.getDate()>1?"days":"day"}`;
  } else {
    return `${days} ${days>1?"days":"day"}`;
  }
  }