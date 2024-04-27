import { FormEvent, useEffect, useState } from 'react';
import RateStar from '../assets/RateStar';
import Logo from '../assets/Logo';
import FileField from './AddFileField';
import { filesToBase64Array } from '../../models/fileToString';

interface Props {
    PORT: string
    onClose: () => void;
}

const RequestPopup = ({ PORT, onClose }: Props) => {
    const [qualification, setQualification] = useState<string>('');
    const [docs, setDocs] = useState<File[]>([]);
    const [error, setError] = useState<{ isError: boolean, text: string }>({ isError: false, text: "" });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const base64Images = await filesToBase64Array(docs);

        if (docs.length === 0) {
            setError({isError: true, text: "Upload at least one document to prove your qualification"})
            return
        }

        await fetch(`${PORT}/api/v1/jwt/users/request`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                // TODO
                comment: qualification,
                file: base64Images[0]
            }),
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                onClose();
            } else {
                setError({
                    isError: true,
                    text: res.error
                });
            }
        }).catch(error => {
            console.log(error)
            setError({
                isError: true,
                text: 'Error'
            });
        });
        console.log('submit')
    }

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-start lg:items-center justify-center z-50 bg-opacity-50 bg-gray-900">
            <div className="relative flex flex-col gap-5 bg-custom-white py-8 px-5 md:p-8 rounded-t-2xl min-w-[330px] w-[540px] mt-20 lg:mt-0 md:rounded-2xl">
                <button className='absolute md:right-8 right-5' onClick={onClose}>✕</button>
                <div className='flex flex-col items-center gap-5'>
                    <Logo />
                    <h1 className='text-center font-bold text-h'>Organizer</h1>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='w-full flex flex-col gap-5 items-strat'>
                        <label htmlFor="qualification" className="">Qualification field and documents:</label>
                        <input
                            type="text"
                            id="qualification"
                            value={qualification}
                            placeholder="Enter your qualification field"
                            className={`w-full border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setQualification(e.target.value)}
                            required
                        />
                    </div>
                    <FileField setSelectedImages={setDocs} selectedImages={docs} type='doc' max={10} />
                    <span className='w-full text-center text-red-500'>
                        {error.isError ? (error.text) : null}
                    </span>
                    <button className='flex items-center justify-center bg-custom-dark-blue text-white h-10 rounded-lg hover:bg-custom-light-blue active:bg-blue-900' type="submit">Send request</button>
                </form>
            </div>
        </div>
    )
}

export default RequestPopup