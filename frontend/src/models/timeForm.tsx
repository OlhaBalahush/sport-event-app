interface TimeFormProps {
    rawDate: string;
}

export const timeForm = ({rawDate}: TimeFormProps) => {
    const date = new Date(rawDate)

    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return `${formattedDate} | ${formattedTime}`
}