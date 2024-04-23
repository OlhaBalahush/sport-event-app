import { useState } from 'react';
import RateStar from '../assets/RateStar';

interface Props {
    onSubmit: () => void;
    onClose: () => void;
}

const JoinConfirmPopup = ({ onSubmit, onClose }: Props) => {
    const [rate, setRate] = useState(0);

    const handleOnClick = (num: number) => {
        setRate(num)
    }

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-start lg:items-center justify-center z-50 bg-opacity-50 bg-gray-900">
            <div className="relative flex flex-col gap-5 bg-custom-white py-8 px-5 md:p-8 rounded-t-2xl min-w-[330px] mt-20 lg:mt-0 md:rounded-2xl">
                <div className='flex flex-col items-center gap-5'>
                    <h1 className='text-center font-bold text-h'>Settings</h1>
                </div>
            </div>
        </div>
    )
}

export default JoinConfirmPopup