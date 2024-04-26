import { useParams } from "react-router-dom";
import Header from "./Reusable/Header";
import Footer from "./Reusable/Footer";
import { useEffect, useState } from "react";
import { Challenge } from "../models/challenge";
import { timeForm } from "../models/timeForm";
import AimIcon from "./assets/AimIcon";
import CalendarIcon from "./assets/CalendarIcon";
import AwardIcon from "./assets/AwardIcon";
import AttendantItem from "./Reusable/AttendantItem";
import { User } from "../models/user";
import ShareIcon from "./assets/Share";
import SaveIcon from "./assets/Save";
import { Category } from "../models/category";
import { useAuth } from "./context/AuthContext";

interface Props {
    PORT: string;
}

const ChallengePage = ({ PORT }: Props) => {
    const { isLoggedIn, curruser } = useAuth();
    const { id } = useParams();
    const [challenge, setChallenge] = useState<Challenge>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [attendants, setAttendants] = useState<User[]>([]);
    const [isJoined, setIsJoined] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const takeEvent = async () => {
            await fetch(`${PORT}/api/v1/challenges/${id}`, {
                method: 'GET',
                credentials: 'include'
            }).then(async response => {
                const res = await response.json();
                console.log(res)
                if (response.ok) {
                    setChallenge(res.data)
                } else {
                    console.error(res.error)
                }
            }).catch(error => {
                console.log('Error taking challenge:', error);
            })
        }

        takeEvent();
    }, []);

    useEffect(() => {
        if (challenge != null) { // ?
            takeAttendants();
            takeCategories();
        }
    }, [challenge]);

    useEffect(() => {
        if (challenge != null && curruser != null) { // ?
            checkJoining();
            checkSaving();
        }
    }, [curruser, challenge]);

    const takeAttendants = async () => {
        await fetch(`${PORT}/api/v1/challenges/attendants/${challenge?.id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                if (res.data != null) {
                    setAttendants(res.data)
                }
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking challenge attendants:', error);
        })
    }

    const takeCategories = async () => {
        await fetch(`${PORT}/api/v1/challenges/categories/${challenge?.id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                if (res.data != null) {
                    setCategories(res.data)
                }
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking events:', error);
        })
    }

    const checkJoining = async () => {
        await fetch(`${PORT}/api/v1/jwt/challenges/joined/${challenge?.id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            console.log(res)
            if (response.ok) {
                setIsJoined(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking event feedback:', error);
        })
    }

    const checkSaving = async () => {
        await fetch(`${PORT}/api/v1/jwt/challenges/saved/${challenge?.id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            console.log(res)
            if (response.ok) {
                setIsSaved(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking event feedback:', error);
        })
    }

    const handleJoining = async () => {
        // TODO handle popups
        // TODO check if user already saved the event
        if (isLoggedIn && curruser != null) {
            await fetch(`${PORT}/api/v1/jwt/challenges/join/${challenge?.id}`, {
                method: 'GET',
                credentials: 'include'
            }).then(async response => {
                const res = await response.json();
                if (response.ok) {
                    setIsJoined(prev => !prev)
                } else {
                    console.error(res.error)
                }
            }).catch(error => {
                console.log('Error taking event feedback:', error);
            })
        } else {
            console.log('login first')
            // TODO toogle popup
        }
    }

    const handleSaving = async () => {
        if (isLoggedIn && curruser != null) {
            await fetch(`${PORT}/api/v1/jwt/challenges/save/${challenge?.id}`, {
                method: 'GET',
                credentials: 'include'
            }).then(async response => {
                const res = await response.json();
                if (response.ok) {
                    setIsSaved(prev => !prev)
                } else {
                    console.error(res.error)
                }
            }).catch(error => {
                console.log('Error saving event:', error);
            })
        } else {
            console.log('login first')
            // TODO toogle popup
        }
    }

    return (
        <div className="w-full absolute min-h-screen">
            <Header PORT={PORT} />
            <div className="min-h-[calc(100vh-56px-72px-48px)] mx-12 xl:mx-40 my-14 py-12 mb-0 flex flex-col items-center gap-8">
                <div className="w-full h-[200px] mb-[calc(172px-25px)] md:mb-[calc(80px-25px)] bg-cover bg-no-repeat"
                    style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://api.dicebear.com/8.x/shapes/svg?seed=${challenge?.id})` }}>
                    <div className="w-full flex flex-col items-center md:flex-row md:items-end justify-between md:pl-8 pt-[175px]">
                        <a href={challenge?.organizationLink}
                            className="flex flex-col items-center md:flex-row gap-5 md:items-end w-auto text-custom-dark md:h-full hover:text-custom-dark-blue">
                            <div className="h-[80px] w-[80px] rounded-lg overflow-hidden">
                                <img
                                    className="min-w-full max-h-full object-cover"
                                    src={`${challenge?.img}`}
                                    onError={(e: any) => {
                                        e.target.src = `https://api.dicebear.com/8.x/shapes/svg?seed=${challenge?.id}`;
                                    }} />
                            </div>
                            <span className="mb-4">
                                {challenge?.organizationName}
                            </span>
                        </a>
                        <div className="flex flex-row gap-5">
                            {categories?.map((item, index) => (
                                <div key={index} className="bg-custom-orange px-4 py-1 rounded-lg text-custom-white md:mb-4">{item.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <h1 className="font-bold text-h text-center">
                    {challenge?.name}
                </h1>
                <div className="w-full grid md:grid-cols-3 gap-5">
                    <div className="md:col-span-1 flex flex-col gap-5">
                        <div className="flex flex-row gap-4 items-center">
                            <div className="w-[35px] flex justify-center">
                                <AimIcon />
                            </div>
                            {challenge?.aim}
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <div className="w-[35px] flex justify-center">
                                <CalendarIcon color="#65656B" />
                            </div>
                            {timeForm({ rawDate: challenge?.deadline || "" })}
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <div className="w-[35px] flex justify-center">
                                <AwardIcon color="#65656B" />
                            </div>
                            {challenge?.award}
                        </div>
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-5">
                        <h2 className="font-bold text-h-2">Overview</h2>
                        <p>{challenge?.overview}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="font-bold text-h-2">Attendants</h2>
                        <span>{attendants?.length} attendees</span>
                    </div>
                    <div className="flex flex-row gap-5">
                        {attendants?.length === 0 ? (
                            <span>No attendants yet</span>
                        ) : null}
                        {attendants?.map((item, index) => (
                            <AttendantItem key={index} attendant={item} />
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <h2 className="font-bold text-h-2">Details & Rules</h2>
                    <p>
                        {challenge?.detailsRules}
                    </p>
                </div>
            </div>
            {/* sticky */}
            <div className="h-full flex flex-row items-center justify-between bg-custom-white px-12 xl:px-40 py-4 md:mb-[48px] sticky bottom-0">
                <span className="hidden md:block text-custom-dark font-bold text-h-2">
                    {challenge?.name}
                </span>
                <div className="w-full md:w-auto flex flex-row gap-5 items-center">
                    <button className="border border-custom-dark rounded-lg p-2 hover:bg-custom-bg">
                        <ShareIcon />
                    </button>
                    <button
                        onClick={handleSaving}
                        className="border border-custom-dark rounded-lg p-2 hover:bg-custom-bg">
                        <SaveIcon color={`${isSaved ? '#015BBB' : 'none'}`} />
                    </button>
                    <button
                        onClick={handleJoining}
                        className="flex items-center justify-center bg-custom-dark-blue text-white h-[40px] w-full md:w-40 rounded-lg hover:bg-custom-light-blue active:bg-blue-900">
                        {isJoined ? (
                            <span>Joined</span>
                        ) : (
                            <span>Join</span>
                        )}
                    </button>
                </div>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}
export default ChallengePage;