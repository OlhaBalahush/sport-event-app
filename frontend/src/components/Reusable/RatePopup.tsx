import { useState } from 'react';
import RateStar from '../assets/RateStar';

interface Props {
    onSubmit: (rateNum: number) => void;
    onClose: () => void;
}

const RatePopup = ({ onSubmit, onClose }: Props) => {
    const [rate, setRate] = useState(0);

    const handleOnClick = (num: number) => {
        setRate(num)
    }

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-start lg:items-center justify-center z-50 bg-opacity-50 bg-gray-900">
            <div className="relative flex flex-col gap-5 bg-custom-white py-8 px-5 md:p-8 rounded-t-2xl min-w-[330px] mt-20 lg:mt-0 md:rounded-2xl">
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='text-center font-bold text-h'>Rate the event</h1>
                </div>
                <div className='w-full flex flex-row gap-5'>
                    {Array.from({ length: 5 }, (_, index) => (
                        <button key={index} className='w-full flex items-center justify-center'
                            onClick={() => handleOnClick(index+1)}>
                            <RateStar isFilled={index + 1 > rate ? false : true} size={50} />
                        </button>
                    ))}
                </div>
                <button className='flex items-center justify-center bg-custom-dark-blue text-white h-10 rounded-lg hover:bg-custom-light-blue active:bg-blue-900'
                    onClick={() => onSubmit(rate)}>
                    Done
                </button>
                <button className='flex flex-row justify-center'
                    onClick={onClose}>
                    <span className="text-custom-gray">Skip</span>
                </button>
            </div>
        </div>
    )
}

export default RatePopup