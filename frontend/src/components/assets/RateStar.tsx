import { IconsProps } from "./IconsInterface";

const RateStar = ({ isFilled }: IconsProps) => {
    return (
        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.7838 3.94275C9.62445 1.76787 10.0448 0.680435 10.7276 0.529722C10.9072 0.490093 11.0928 0.490093 11.2723 0.529722C11.9552 0.680435 12.3756 1.76787 13.2162 3.94275C13.6943 5.17955 13.9333 5.79796 14.3805 6.21857C14.506 6.33655 14.6422 6.44162 14.7872 6.53231C15.3041 6.85566 15.9494 6.91563 17.2401 7.03559C19.4249 7.23865 20.5174 7.34018 20.851 7.98658C20.9201 8.12045 20.967 8.2654 20.9899 8.41539C21.1005 9.13962 20.2974 9.89787 18.6913 11.4144L18.2452 11.8355C17.4943 12.5445 17.1188 12.899 16.9017 13.3414C16.7714 13.6067 16.684 13.8925 16.6431 14.1873C16.5749 14.6788 16.6848 15.193 16.9047 16.2215L16.9833 16.589C17.3776 18.4335 17.5748 19.3558 17.3287 19.8091C17.1076 20.2163 16.7004 20.477 16.2505 20.4993C15.7497 20.5241 15.044 19.9273 13.6326 18.7339C12.7028 17.9475 12.2379 17.5544 11.7217 17.4008C11.2501 17.2605 10.7499 17.2605 10.2783 17.4008C9.76213 17.5544 9.29721 17.9475 8.36736 18.7339C6.956 19.9273 6.25033 20.5241 5.74951 20.4993C5.29965 20.477 4.89241 20.2163 4.67132 19.8091C4.42519 19.3558 4.62236 18.4335 5.0167 16.589L5.09527 16.2215C5.31516 15.193 5.42511 14.6788 5.35688 14.1873C5.31595 13.8925 5.2286 13.6067 5.09833 13.3414C4.88116 12.899 4.5057 12.5445 3.75478 11.8355L3.30875 11.4144C1.70256 9.89787 0.899467 9.13962 1.01007 8.41539C1.03297 8.2654 1.07995 8.12045 1.14904 7.98658C1.48264 7.34018 2.57506 7.23865 4.7599 7.03559C6.05056 6.91563 6.69588 6.85566 7.21283 6.53231C7.35783 6.44162 7.49401 6.33655 7.61946 6.21857C8.06672 5.79796 8.30575 5.17955 8.7838 3.94275Z"
                stroke={`${isFilled ? '#FED403' : '#65656B'}`}
                fill={`${isFilled ? '#FED403' : ''}`} />
        </svg>
    );
}
//fill="#FED403" stroke="#FED403"
export default RateStar;