import { useEffect, useState } from 'react';
import Logo from '../assets/Logo';
import { Request } from '../../models/request';
import { User } from '../../models/user';
import { base64StringToBlob, extractFileNameFromBase64 } from '../../models/fileToString';
import DownloadIcon from '../assets/Download';

interface Props {
    PORT: string
    onClose: (res: boolean, id: number) => void;
    request: Request;
    user?: User;
}

const NRequestPopup = ({ PORT, onClose, request, user }: Props) => {
    const [error, setError] = useState<{ isError: boolean, text: string }>({ isError: false, text: "" });

    const handleApprove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        handleSubmit('approve')
    }

    const handleReject = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()

        handleSubmit('reject')
    }

    const handleSubmit = async (status: string) => {
        await fetch(`${PORT}/api/v1/jwt/admin/requests/${request.id}/${status}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                onClose(true, request.id);
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking user:', error);
        })
    }

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-start lg:items-center justify-center z-50 bg-opacity-50 bg-gray-900">
            <div className="relative flex flex-col gap-5 bg-custom-white py-8 px-5 md:p-8 rounded-t-2xl min-w-[330px] w-[540px] mt-20 lg:mt-0 md:rounded-2xl">
                <button className='absolute md:right-8 right-5' onClick={() => onClose(false, -1)}>✕</button>
                <div className='flex flex-col items-center gap-5'>
                    <Logo />
                    <h1 className='text-center font-bold text-h'>Organizer</h1>
                </div>
                <div className='w-full flex flex-col gap-5'>
                    <a href={`/user/${user?.id}`} className="flex flex-row gap-5 items-center hover:text-custom-dark-blue">
                        <div className="h-full w-[50px] rounded-full overflow-hidden">
                            <img
                                className="min-w-full max-h-full object-cover"
                                src={`${user?.img}`}
                                onError={(e: any) => {
                                    e.target.src = `https://api.dicebear.com/8.x/thumbs/svg?seed=${user?.id}`;
                                }} />
                        </div>
                        {user?.fullname}
                    </a>
                    <span>Qualification:</span>
                    <span>{request.comment}</span>
                    <div className='flex flex-row justify-between'>
                        <span>Attached file (download file):</span>
                        <a className="text-custom-dark overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[100px] hover:text-custom-dark-blue"
                            href={URL.createObjectURL(base64StringToBlob(request.file))}
                            download={extractFileNameFromBase64(request.file)}>
                            {extractFileNameFromBase64(request.file)}
                        </a>

                    </div>
                    <div className='flex flex-row gap-5'>
                        <button
                            onClick={handleReject}
                            className="flex items-center justify-center bg-transparent text-custom-dark border border-custom-dark h-[40px] w-full rounded-lg hover:bg-custom-light-blue hover:border-custom-bg hover:text-white active:bg-blue-900">
                            Reject
                        </button>
                        <button
                            onClick={handleApprove}
                            className="flex items-center justify-center bg-custom-dark-blue text-white h-[40px] w-full rounded-lg hover:bg-custom-light-blue active:bg-blue-900">
                            Approve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NRequestPopup