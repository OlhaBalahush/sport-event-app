import { useParams } from "react-router-dom";
import Header from "./Reusable/Header";
import Footer from "./Reusable/Footer";
import { useEffect, useState } from "react";
import { User } from "../models/user";
import { Event } from "../models/event";
import EditIcon from "./assets/Edit";
import { Category } from "../models/category";
import { Challenge } from "../models/challenge";
import { useAuth } from "./context/AuthContext";
import EventItem from "./Reusable/EventItem";
import ChallengeItem from "./Reusable/ChallengeItem";

interface Props {
    PORT: string;
}

const UserPage = ({ PORT }: Props) => {
    const { isLoggedIn, curruser } = useAuth();
    const { id } = useParams();
    const [user, setUser] = useState<User>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    const [eventsType, setEventsType] = useState('attended');
    const [challengesType, setChallengesType] = useState('attended');

    useEffect(() => {
        const takeEvent = async () => {
            await fetch(`${PORT}/api/v1/users/${id}`, {
                method: 'GET',
                credentials: 'include'
            }).then(async response => {
                const res = await response.json();
                if (response.ok) {
                    setUser(res.data)
                } else {
                    console.error(res.error)
                }
            }).catch(error => {
                console.log('Error taking event:', error);
            })
        }

        takeEvent();
    }, []);

    useEffect(() => {
        if (user != null) { // ?
            takeCategories();
            takeEvents();
            takeChallenges();
        }
    }, [user]);

    useEffect(() => {
        takeEvents()
    }, [eventsType])

    useEffect(() => {
        takeChallenges()
    }, [challengesType])

    const takeCategories = async () => {
        await fetch(`${PORT}/api/v1/users/categories/${user?.id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                setCategories(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking events:', error);
        })
    }
    
    const takeEvents = async () => {
        await fetch(`${PORT}/api/v1/users/${id}/events/${eventsType}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                setEvents(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking events:', error);
        })
    }

    const takeChallenges = async () => {
        await fetch(`${PORT}/api/v1/users/${id}/challenges/${challengesType}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                setChallenges(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking events:', error);
        })
    }

    const handleEventsTypeChanges = (type: string) => {
        setEventsType(type)
    }

    const handleChallengesTypeChanges = (type: string) => {
        setChallengesType(type)
    }

    return (
        <div className="w-full absolute min-h-screen">
            <Header PORT={PORT} />
            <div className="mx-12 xl:mx-40 my-14 py-12 flex flex-col items-center gap-8">
                <div className="w-full grid md:grid-cols-4 gap-5 md:gap-10">
                    <div style={{ height: 'fit-content' }}
                        className="md:col-span-1 md:sticky md:top-[calc(56px+48px)] flex flex-col gap-5">
                        <div className="h-full w-full rounded-full overflow-hidden">
                            <img
                                className="min-w-full max-h-full object-cover"
                                src={`${user?.img}`}
                                onError={(e: any) => {
                                    e.target.src = `https://api.dicebear.com/8.x/thumbs/svg?seed=${user?.id}`;
                                }} />
                        </div>
                        <span className="w-full text-center">{user?.fullname} (AKA {user?.username})</span>
                        {user?.id === curruser?.id ? (
                            <button className="w-full font-bold text-h-2 flex flex-row items-center justify-between">
                                <span>Settings</span>
                                <EditIcon />
                            </button>
                        ) : null}
                        <div className="w-full flex flex-row justify-between">
                            <span>Level:</span>
                            <span>{user?.level}</span>
                        </div>
                        {categories != null ? (
                            <div className="w-full flex flex-col gap-5">
                                <span>Categories:</span>
                                <div className="w-full flex flex-wrap flex-row gap-2">
                                    {categories.map((item, index) => (
                                        <div key={index} className="w-auto bg-custom-light-blue px-4 py-1 rounded-lg text-custom-white">{item.name}</div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                        {user?.id === curruser?.id ? (
                            <button className="w-full h-[40px] flex items-center justify-center bg-custom-dark-blue text-white rounded-lg hover:bg-custom-light-blue active:bg-blue-900">
                                Become organizer
                            </button>
                        ) : null}
                    </div>
                    <div className="md:col-span-3 flex flex-col gap-5">
                        <h2 className="font-bold text-h-2">Progress</h2>
                        <div className="w-full h-[200px] bg-custom-light-blue text-white">canvas</div>
                        <div className="w-full flex flex-row items-center justify-between">
                            <h2 className="font-bold text-h-2">Events</h2>
                            <div className="flex flex-row gap-5 items-center justify-between">
                                <button className={`${eventsType === 'attended' ? 'custom-dark' : 'text-custom-gray'} flex flex-row items-center gap-2 h-full hover:text-custom-dark-blue`}
                                    onClick={() => handleEventsTypeChanges('attended')}>
                                    Attended
                                </button>
                                {user?.id === curruser?.id ? (
                                    <button className={`${eventsType === 'saved' ? 'custom-dark' : 'text-custom-gray'} flex flex-row items-center gap-2 h-full hover:text-custom-dark-blue`}
                                        onClick={() => handleEventsTypeChanges('saved')}>
                                        Saved
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        { events == null || events.length === 0 ? (
                            <span>User has events yet</span>
                        ) : (
                            <div className="w-full flex flex-wrap justify-between gap-x-5 gap-y-12">
                                {events.map((item, index) => (
                                    <EventItem key={index} event={item} />
                                ))}
                            </div>
                        )}
                        <div className="w-full flex flex-row items-center justify-between">
                            <h2 className="font-bold text-h-2">Challenges</h2>
                            <div className="flex flex-row gap-5 items-center justify-between">
                                <button className={`${challengesType === 'attended' ? 'custom-dark' : 'text-custom-gray'} flex flex-row items-center gap-2 h-full hover:text-custom-dark-blue`}
                                    onClick={() => handleChallengesTypeChanges('attended')}>
                                    Attended
                                </button>
                                {user?.id === curruser?.id ? (
                                    <button className={`${challengesType === 'saved' ? 'custom-dark' : 'text-custom-gray'} flex flex-row items-center gap-2 h-full hover:text-custom-dark-blue`}
                                        onClick={() => handleChallengesTypeChanges('saved')}>
                                        Saved
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        { challenges == null || challenges.length === 0 ? (
                            <span>User has challenges yet</span>
                        ) : (
                            <div className="w-full flex flex-wrap justify-between gap-x-5 gap-y-12">
                                {challenges.map((item, index) => (
                                    <ChallengeItem key={index} challenge={item} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}
export default UserPage;