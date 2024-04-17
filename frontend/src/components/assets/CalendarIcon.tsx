import { IconsProps } from "./IconsInterface";

const CalendarIcon = ({color}: IconsProps) => {

    return (
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="5.16667" width="25" height="20.8333" rx="2" stroke={color} />
            <path d="M1 12.1111L26 12.1111" stroke={color} stroke-linecap="round" />
            <path d="M7.94434 1L7.94434 6.55556" stroke={color} stroke-linecap="round" />
            <path d="M19.0557 1L19.0557 6.55556" stroke={color} stroke-linecap="round" />
        </svg>
    );
}

export default CalendarIcon;