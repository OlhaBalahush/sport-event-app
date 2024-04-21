import React, { useState } from 'react';
import SendIcon from '../assets/Send';

interface Props {
    onSubmit: (query: string) => void;
}

const InputField = ({ onSubmit }: Props) => {
    const [query, setQuery] = useState('');
    const [rows, setRows] = useState(1);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setQuery(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onSubmit(query);
            setQuery('');
            setRows(1);
        } else if (event.key === 'Enter' && event.shiftKey) {
            setQuery(query);
            setRows(prev => prev + 1);
        } else if (event.key === 'Backspace') {
            setQuery(query);
            setRows(prev => prev === 1 ? prev : prev - 1);
        }
    };

    const handleSubmit = (event: any) => {
        if (query != '') {
            event.preventDefault();
            onSubmit(query);
            setQuery('');
            setRows(1);
        }
    }

    return (
        <div className='w-full flex felx-row items-center gap-4 rounded-lg px-5 py-2 border border-custom-dark min-h-[40px] bg-custom-bg'>
            <textarea
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Write your feedback ..."
                className='w-full max-h-[100px] border bg-transparent border-transparent focus:border-transparent focus:outline-none focus:ring-0'
                rows={rows}
            />
            <button className='rounded-full flex felx-row items-center justify-center'
                onClick={handleSubmit}>
                <SendIcon />
            </button>
        </div>
    );
};

export default InputField;
