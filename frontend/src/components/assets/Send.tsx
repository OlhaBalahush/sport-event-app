import { useState } from "react";

const SendIcon = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <path fillRule="evenodd" clipRule="evenodd" d="M26.4899 1.0323C26.0661 1.10768 25.4871 1.29932 24.643 1.58066L7.71776 7.22242C5.34939 8.01188 3.6233 8.58838 2.48364 9.1428C1.30196 9.71766 1 10.1524 1 10.5428C1 10.9333 1.30196 11.368 2.48364 11.9428C3.6233 12.4972 5.34938 13.0737 7.71775 13.8632L10.4883 14.7867C10.5252 14.799 10.5615 14.8111 10.5974 14.823C11.422 15.0974 11.9955 15.2882 12.4142 15.7069C12.8329 16.1256 13.0237 16.6991 13.298 17.5236C13.31 17.5595 13.3221 17.5959 13.3343 17.6328L14.2579 20.4033C15.0473 22.7717 15.6238 24.4978 16.1782 25.6374C16.7531 26.8191 17.1878 27.1211 17.5782 27.1211C17.9687 27.1211 18.4034 26.8191 18.9783 25.6374C19.5327 24.4978 20.1092 22.7717 20.8986 20.4033L26.5404 3.47803C26.8217 2.634 27.0134 2.05492 27.0888 1.63118C27.1648 1.20382 27.0898 1.10673 27.0521 1.069C27.0143 1.03126 26.9172 0.956276 26.4899 1.0323ZM26.3147 0.047757C26.8245 -0.0429293 27.3599 -0.0373916 27.7592 0.361891C28.1585 0.761173 28.164 1.29654 28.0733 1.80633C27.9835 2.31111 27.7671 2.96027 27.5027 3.75347L27.4891 3.79426L21.8473 20.7195L21.8332 20.762C21.0607 23.0795 20.4643 24.8687 19.8775 26.0749C19.3076 27.2464 18.6293 28.1211 17.5782 28.1211C16.5272 28.1211 15.8489 27.2464 15.279 26.0749C14.6922 24.8687 14.0958 23.0795 13.3233 20.762L13.3092 20.7195L12.3857 17.949C12.0594 16.9703 11.9378 16.6448 11.7071 16.414C11.4763 16.1832 11.1507 16.0616 10.1721 15.7354L7.40153 14.8119L7.35899 14.7977C5.04158 14.0252 3.25236 13.4288 2.04618 12.8421C0.87465 12.2721 0 11.5939 0 10.5428C0 9.49174 0.874651 8.81348 2.04618 8.24356C3.25236 7.65678 5.04158 7.06038 7.35897 6.28792L7.40153 6.27374L24.3268 0.63198L24.3676 0.618371C25.1608 0.353956 25.81 0.137552 26.3147 0.047757Z"
                fill={isHovered ? '#015BBB' : '#131315'} />
        </svg>
    );
}

export default SendIcon;