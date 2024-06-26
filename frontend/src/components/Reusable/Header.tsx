import { useEffect, useState } from "react";
import Logo from "../assets/Logo";
import Footer from "./Footer";
import LogIn from "../Authentication/LogIn";
import SignUp from "../Authentication/SignUp";
import { useAuth } from "../context/AuthContext";
import NotificationsBell from "../assets/NotificationsBell";
import SetUpPopup from "../Authentication/SetUp";

interface Props {
    PORT: string;
}

const Header = ({ PORT }: Props) => {
    const { isLoggedIn, curruser } = useAuth();

    const [location, setLocation] = useState("Kyiv");
    const [showMenu, setShowMenu] = useState(false);

    const [showSinUp, setShowSignUp] = useState(false);
    const [showLogIn, setShowLogIn] = useState(false);
    const [showSetUp, setShowSetUp] = useState(false);

    const [notifNum, SetNotifNum] = useState<number>(0);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    let lat = position.coords.latitude
                    let long = position.coords.longitude

                    try {
                        await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                            .then(async (response) => {
                                const data = await response.json();
                                setLocation(data.address.city || data.address.town || data.address.country || "Kyiv")
                            })
                            .catch((error) => {
                                console.error('Error while fetching data:', error)
                            })
                    } catch (error) {
                        console.error(error)
                    }
                }, (error) => {
                    console.error(error)
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, [])

    useEffect(() => {
        if (isLoggedIn && curruser != null) {
            takeNotifNum();
        }
    }, [curruser])

    const takeNotifNum = async () => {
        await fetch(`${PORT}/api/v1/jwt/notifications/num`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                SetNotifNum(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking user:', error);
        })
    }

    const handleSubmit = () => {
        console.log('submit')
    }

    const toogleSignUpPopup = (res: boolean) => {
        setShowMenu(false)
        setShowLogIn(false)
        setShowSignUp((prev) => !prev)
        if (res) {
            console.log('setup')
            toogleSetUpPopup()
        }
    }

    const toogleSetUpPopup = () => {
        setShowMenu(false)
        setShowSetUp((prev) => !prev)
    }

    const toogleLogInPopup = () => {
        setShowMenu(false)
        setShowSignUp(false)
        setShowLogIn((prev) => !prev)
    }

    const onChange = () => {
        setShowSignUp((prev) => !prev)
        setShowLogIn((prev) => !prev)
    }

    return (
        <>
            <header className="h-14 py-3 px-12 xl:px-40 flex justify-between items-center fixed top-0 w-full border-b border-custom-dark bg-custom-bg">
                <div className="flex gap-5 items-center">
                    <Logo />
                    <form className="ct-form-cont" onSubmit={handleSubmit}>
                        <input
                            id="location"
                            type='text'
                            value={location}
                            placeholder="Location"
                            onChange={(e) => setLocation(e.target.value)}
                            className="font-poppins h-auto border border-custom-dark rounded-lg px-3 py-1 hidden md:block"
                        />
                    </form>
                </div>
                <div className={`${showMenu ? 'block' : 'hidden'} md:flex md:relative absolute z-20 left-0 md:top-0 top-14 flex items-end md:flex-row md:h-full flex-col gap-5 md:w-auto w-full h-[calc(100vh-56px)] bg-custom-bg px-12 py-12 md:px-0 md:py-0`}>
                    <div className="md:hidden">
                        <form className="ct-form-cont" onSubmit={handleSubmit}>
                            <input
                                id="location-resp"
                                type='text'
                                value={location}
                                placeholder="Location"
                                onChange={(e) => setLocation(e.target.value)}
                                className="font-poppins w-full h-auto border border-custom-dark rounded-lg px-5 py-2 block"
                            />
                        </form>
                    </div>
                    <a href="/" className="flex items-center justify-center w-auto bg-custom-bg text-custom-dark px-2 md:h-full hover:text-custom-dark-blue">
                        Events
                    </a>
                    <a href="/challenges" className="flex items-center justify-center bg-custom-bg text-custom-dark px-2 md:h-full hover:text-custom-dark-blue">
                        Challenges
                    </a>
                    {isLoggedIn && curruser != null ? (
                        <div className="flex flex-row gap-5 md:h-full items-center">
                            <a href="/notifications" className="relative">
                                {notifNum != 0 ? (
                                    <span className="flex items-center justify-center absolute top-0 right-0 rounded-full bg-custom-yellow w-4 h-4 text-add">{notifNum}</span>
                                ) : null}
                                <NotificationsBell />
                            </a>
                            <a href={`/user/${curruser.id}`} className="flex flex-row items-center gap-2 h-full hover:text-custom-dark-blue">
                                <div className="h-full w-8 aspect-square flex items-center justify-center rounded-full overflow-hidden">
                                    <img
                                        className="min-w-full max-h-full object-cover"
                                        src={`${curruser.img}`}
                                        onError={(e: any) => {
                                            e.target.src = `https://api.dicebear.com/8.x/thumbs/svg?seed=${curruser.id}`;
                                        }} />
                                </div>
                                {curruser.username}
                            </a>
                        </div>
                    ) : (
                        <div className="flex flex-row gap-5 w-full md:md:h-full items-center">
                            <button onClick={(e) => toogleLogInPopup()} className="flex items-center justify-center bg-custom-bg text-custom-dark border border-custom-dark h-[40px] md:h-full w-full md:w-40 rounded-lg hover:bg-custom-light-blue hover:border-custom-bg hover:text-white active:bg-blue-900">
                                Log In
                            </button>
                            <button onClick={(e) => toogleSignUpPopup(false)} className="flex items-center justify-center bg-custom-dark-blue text-white h-[40px] md:h-full w-full md:w-40 rounded-lg hover:bg-custom-light-blue active:bg-blue-900">
                                Sign Up
                            </button>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 w-full md:hidden">
                        <Footer />
                    </div>
                </div>
                <div className="md:hidden">
                    <button className="text-xl text-custom-dark" onClick={() => setShowMenu(!showMenu)}>
                        {showMenu ? '✕' : '☰'}
                    </button>
                </div>
            </header>
            {!isLoggedIn && showLogIn ? (
                <LogIn PORT={PORT} onClose={toogleLogInPopup} onChange={onChange} />
            ) : null}
            {!isLoggedIn && showSinUp ? (
                <SignUp PORT={PORT} onClose={(res) => toogleSignUpPopup(res)} onChange={onChange} />
            ) : null}
            {isLoggedIn && showSetUp ? (
                <SetUpPopup PORT={PORT} onClose={toogleSetUpPopup} />
            ) : null}
        </>
    )
}

export default Header;