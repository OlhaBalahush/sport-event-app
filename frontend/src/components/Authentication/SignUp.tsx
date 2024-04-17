
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Github from '../assets/Github';
import Google from '../assets/Google';
import Logo from '../assets/Logo';
import { User } from '../../models/user';

interface Props {
    PORT: string;
    onClose: () => void;
    onChange: () => void;
}

const SignUp = ({ PORT, onClose, onChange }: Props) => {
    const [fullName, setFullName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');
    const [error, setError] = useState<{ isError: boolean, text: string }>({ isError: false, text: "" });
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== repeatedPassword) {
            setError({ isError: true, text: 'Wrong repeated password' })
            return
        }
        await fetch(`${PORT}/api/v1/users/create`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "appliction/json" },
            body: JSON.stringify({ fullName, username, email, password }),
        }).then(async response => {
            const res = await response.json();
            console.log(res)
            if (response.ok) {
                let curruser: User = res.data as User;
                login(curruser);
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
    };

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-start lg:items-center justify-center z-50 bg-opacity-50 bg-gray-900">
            <div className="relative flex flex-col gap-5 bg-custom-bg-2 py-8 px-5 md:p-8 rounded-t-2xl min-w-[330px] w-[540px] mt-20 lg:mt-0 md:rounded-2xl">
                <button className='absolute md:right-8 right-5' onClick={onClose}>✕</button>
                <div className='flex flex-col items-center gap-5'>
                    <Logo />
                    <h1 className='text-center font-bold text-h'>Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="fullname" className="">Fullname:</label>
                        <input
                            type="text"
                            id="fullname"
                            value={fullName}
                            placeholder="Enter your fullname"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="username" className="">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            placeholder="Enter your username"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="email" className="">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter your email"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="password" className="">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Enter your password"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="repeatedPassword" className="">Repeat password:</label>
                        <input
                            type="password"
                            id="repeatedPassword"
                            value={repeatedPassword}
                            placeholder="Repeat your password"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setRepeatedPassword(e.target.value)}
                            required
                        />
                    </div>
                    <span className='w-full text-center text-red-500'>
                        {error.isError ? (error.text) : null}
                    </span>
                    <button className='flex items-center justify-center bg-custom-dark-blue text-white h-10 rounded-lg hover:bg-custom-light-blue active:bg-blue-900' type="submit">Sign Up</button>
                </form>
                <div className='flex flex-row justify-center'>
                    <span className="text-custom-gray">Already a user?</span>
                    <button onClick={onChange} className='text-custom-dark px-2 md:h-full hover:text-custom-dark-blue'>Log in</button>
                </div>
                <div className='h-0 flex justify-center items-center border-b'>
                    <div className='bg-custom-bg-2 px-4 text-custom-gray text-add'>or</div>
                </div>
                {/* TODO add func */}
                <div className='flex flex-row items-center border border-custom-dark rounded-lg py-2 px-5 hover:bg-custom-bg'>
                    <Google />
                    <div className='md:px-20 px-5'>Sign Up with Google</div>
                </div>
                <div className='flex flex-row items-center border border-custom-dark rounded-lg py-2 px-5 hover:bg-custom-bg'>
                    <Github />
                    <div className='md:px-20 px-5'>Sign Up with Github</div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
