import React, { useState } from 'react';

const NotificationsBell = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <svg
            width="31"
            height="32"
            viewBox="0 0 31 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <path fillRule="evenodd" clipRule="evenodd" d="M7.22144 2.7463C5.29277 4.84434 5.18845 6.61258 4.97979 10.149L4.76104 13.8566C4.64592 15.8076 4.58836 16.7831 4.30271 17.7076C4.01706 18.6321 3.5143 19.4701 2.50879 21.146L2.50877 21.146L1.01381 23.6377C0.208074 24.9806 -0.194794 25.652 0.0924354 26.1593C0.379665 26.6666 1.16271 26.6666 2.7288 26.6666H27.6639C29.23 26.6666 30.0131 26.6666 30.3003 26.1593C30.5876 25.652 30.1847 24.9806 29.3789 23.6376L27.7805 20.9737L27.7805 20.9736C26.826 19.3827 26.3487 18.5873 26.0669 17.7121C25.785 16.8369 25.7084 15.9124 25.5551 14.0634L25.2106 9.90757C24.9263 6.47745 24.7841 4.76239 22.8988 2.73483C21.0136 0.707274 19.9904 0.547003 17.9441 0.226459C17.0447 0.0855607 16.0664 0 15.0168 0C14.0551 0 13.1533 0.0718241 12.3171 0.192227C10.2058 0.49625 9.1501 0.648261 7.22144 2.7463ZM19.6365 28.5944C19.6408 28.5117 19.5733 28.4445 19.4904 28.4445L15.196 28.4444L10.9015 28.4445C10.8187 28.4445 10.7511 28.5117 10.7555 28.5944C10.8023 29.4829 11.2641 30.3272 12.0533 30.9586C12.8868 31.6254 14.0172 32 15.196 32C16.3747 32 17.5052 31.6254 18.3387 30.9586C19.1279 30.3272 19.5896 29.4829 19.6365 28.5944Z"
                fill={isHovered ? '#015BBB' : '#131315'} />
        </svg>
    );
}

export default NotificationsBell;
