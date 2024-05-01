import { useEffect, useState } from 'react';
import { Feedback } from '../../models/feedback';
import { User } from '../../models/user';
import RateStar from '../assets/RateStar';

interface Props {
    PORT: string;
    feedback: Feedback;
}

const FeedbackItem = ({ PORT, feedback }: Props) => {

    const [author, setAuthor] = useState<User>();

    useEffect(() => {
        const takeAuthor = async () => {
            await fetch(`${PORT}/api/v1/users/${feedback.userId}`, {
                method: 'GET',
                credentials: 'include'
            }).then(async response => {
                const res = await response.json();
                if (response.ok) {
                    setAuthor(res.data)
                } else {
                    console.error(res.error)
                }
            }).catch(error => {
                console.log('Error taking event:', error);
            })
        }

        takeAuthor();
    }, []);

    return (
        <div className='w-full flex flex-row gap-5 px-4 md:px-[60px] bg-custom-white rounded-lg'>
            {feedback.img.Valid ? (
                <div>
                    img
                </div>
            ) : null}
            <div className='w-full flex flex-col gap-3 py-[30px]'>
                <div className='w-full flex flex-col md:flex-row gap-3 md:justify-between'>
                    <a href={`/user/${feedback.userId}`} className="flex flex-row items-center gap-2 h-full hover:text-custom-dark-blue">
                        <div className="h-8 flex items-center justify-center aspect-square rounded-full overflow-hidden">
                            <img
                                className="min-w-full max-h-full object-cover"
                                src={`${author?.img}`} //todo
                                onError={(e: any) => {
                                    e.target.src = `https://api.dicebear.com/8.x/thumbs/svg?seed=${feedback.userId}`;
                                }} />
                        </div>
                        {author?.username}
                    </a>
                    <div className='h-full flex flex-row gap-1 items-center'>
                        {Array.from({length: 5}, (_, index) => (
                            <RateStar key={index} isFilled={index + 1 > feedback.rate ? false : true} size={0}/>
                        ))}
                    </div>
                </div>
                <span className='md:pl-10'>
                    {feedback.comment}
                </span>
            </div>
        </div>
    );
};

export default FeedbackItem;
