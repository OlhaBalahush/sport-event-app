
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Github from '../assets/Github';
import Google from '../assets/Google';

interface Props {
    PORT: string;
}

const SignUp = ({ PORT }: Props) => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');
    const [error, setError] = useState<{ isError: boolean, text: string }>({ isError: false, text: "" });
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn])

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
            body: JSON.stringify({ /*TODO*/ }),
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                navigate('/');
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
        <div className="md:fixed inset-0 flex items-center justify-center z-50 bg-custom-bg">
            <div className="flex flex-col gap-5 bg-custom-bg-2 p-8 rounded-2xl min-w-[330px] w-[540px] mt-16 md:mt-0">
                <h1 className='text-center font-bold'>Sign Up</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="fullname" className="">Fullname:</label>
                        <input
                            type="text"
                            id="fullname"
                            value={fullName}
                            placeholder="Enter your fullname"
                            className={`border ${error.isError ? 'border-red' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setFullName(e.target.value)}
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
                            className={`border ${error.isError ? 'border-red' : 'border-custom-dark'} rounded-lg px-4 py-2`}
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
                            className={`border ${error.isError ? 'border-red' : 'border-custom-dark'} rounded-lg px-4 py-2`}
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
                            className={`border ${error.isError ? 'border-red' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setRepeatedPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className='flex items-center justify-center bg-custom-dark-blue text-white h-10 rounded-lg hover:bg-custom-light-blue active:bg-blue-900' type="submit">Sign Up</button>
                </form>
                <div className='flex flex-row justify-center'>
                    <span className="text-custom-gray">Already a user? </span>
                    <a className='text-custom-dark px-2 md:h-full hover:text-custom-dark-blue' href="/login">Log in</a>
                </div>
                <div className='h-0 flex justify-center items-center border-b'>
                    <div className='bg-custom-bg-2 px-4 text-custom-gray'>or</div>
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
