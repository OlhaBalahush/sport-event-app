interface TimeFormProps {
    rawDate: string;
}

export const timeForm = ({rawDate}: TimeFormProps) => {
    const date = new Date(rawDate)

    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return `${formattedDate} | ${formattedTime}`
}

export const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysSinceFirstDayOfYear = Math.round((date.getTime() - firstDayOfYear.getTime()) / (1000 * 60 * 60 * 24));
    return Math.ceil((firstDayOfYear.getDay() + daysSinceFirstDayOfYear) / 7);
};