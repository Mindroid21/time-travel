/**
 * PAJ - Helper function to get date format in DAY, MMM DD YYYY @ HH:MM
 * @param dateObj Date
 * @returns string
 */
export function formatDate (dateObj: Date): string {
    const hours = dateObj.getHours();
    const mins = dateObj.getMinutes()==0 ? '00': dateObj.getMinutes();
    const date = dateObj.toDateString();
    return `${date} @ ${hours} : ${mins}`;
}