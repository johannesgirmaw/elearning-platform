export const formatDateTime = (dateTimeString: string): string => {
  try {
    const date = new Date(dateTimeString);
    
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    const formattedDate = date.toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${formattedDate} (${formattedTime})`;
  } catch (error) {
    return 'Invalid Date';
  }
}

export function formatDate(dateString: string): string {
  // Parse the initial date string into a Date object
  const date = new Date(dateString);

  // Extract year, month, and day from the date object
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
  const day = date.getDate().toString().padStart(2, '0');

  // Extract hours and minutes
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Construct the formatted date string in ISO 8601 format (YYYY-MM-DDTHH:mm)
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate;
}

export function getHourDifference(date1: Date, date2: Date): number {
  // Convert dates to milliseconds
  const millisecondsDifference = date2.getTime() - date1.getTime();

  // Convert milliseconds to hours and round down to nearest whole hour
  const hoursDifference = Math.floor(millisecondsDifference / (1000 * 60 * 60));

  return Math.abs(hoursDifference); // Ensure positive difference
}