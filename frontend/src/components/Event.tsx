import { useParams } from "react-router-dom";
import Header from "./Reusable/Header";
import Footer from "./Reusable/Footer";
import { useEffect, useState } from "react";
import { timeForm } from "../models/timeForm";
import LocationIcon from "./assets/Location";
import CalendarIcon from "./assets/CalendarIcon";
import EventItem from "./Reusable/EventItem";
import { Event } from "../models/event";
import { User } from "../models/user";
import { Category } from "../models/category";
import { Feedback } from "../models/feedback";
import InputField from "./Reusable/FeedbackInputField";
import FeedbackItem from "./Reusable/FeedbackItem";
import ShareIcon from "./assets/Share";
import SaveIcon from "./assets/Save";
import RatePopup from "./Reusable/RatePopup";
import { useAuth } from "./context/AuthContext";
import AttendantItem from "./Reusable/AttendantItem";

interface Props {
    PORT: string;
}

const EventPage = ({ PORT }: Props) => {
    const { isLoggedIn, curruser } = useAuth();
    const { id } = useParams();
    const [event, setEvent] = useState<Event>();
    const [organizer, setOrganizer] = useState<User>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [imgs, setImgs] = useState([]);
    const [attendants, setAttendants] = useState<User[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [feedback, setFeedback] = useState<Feedback[]>([]);

    useEffect(() => {
        const takeEvent = async () => {
            await fetch(`${PORT}/api/v1/events/${id}`, {
                method: 'GET',
                credentials: 'include'
            }).then(async response => {
                const res = await response.json();
                if (response.ok) {
                    setEvent(res.data)
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
        if (event != null) { // ?
            takeOrganizer();
            takeAttendants();
            takeRecomendations();
            takeFeedback();
            takeCategories();
            takeImgs();
        }
    }, [event]);

    const takeOrganizer = async () => {
        await fetch(`${PORT}/api/v1/users/${event?.organizerId}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                setOrganizer(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking event:', error);
        })
    }

    const takeAttendants = async () => {
        await fetch(`${PORT}/api/v1/events/attendants/${event?.id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                setAttendants(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking event:', error);
        })
    }

    // TODO how to make list of recommendations
    const takeRecomendations = async () => {
        await fetch(`${PORT}/api/v1/events`, {
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

    const takeCategories = async () => {
        await fetch(`${PORT}/api/v1/events/categories/${event?.id}`, {
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

    const takeImgs = async () => {
        await fetch(`${PORT}/api/v1/events/imgs/${event?.id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                setImgs(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking events:', error);
        })
    }

    const takeFeedback = async () => {
        await fetch(`${PORT}/api/v1/events/feedback/${event?.id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                setFeedback(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking event feedback:', error);
        })
    }

    const onSubmitFeedback = async (newFeedback: string, rate: number) => {
        const newFeed: Feedback = {
            id: -1,
            eventId: event == undefined ? '' : event.id,
            userId: curruser == undefined ? '' : curruser.id,
            comment: newFeedback,
            img: { String: '', Valid: false },
            rate: rate,
            createdAt: ''
        }
        // console.log(`newFeedback: ${newFeed}`);
        await fetch(`${PORT}/api/v1/feedback/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                eventId: event == undefined ? '' : event.id,
                userId: curruser == undefined ? '' : curruser.id,
                comment: newFeedback,
                img: { String: '', Valid: false },
                rate: rate,
            }),
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                setFeedback(prev => [...prev, newFeed])
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error posting feedback:', error);
        })
    }

    return (
        <div className="w-full absolute min-h-screen">
            <Header PORT={PORT} />
            <div className="min-h-[calc(100vh-56px-72px-48px)] mx-12 xl:mx-40 my-14 mb-0 py-12 flex flex-col items-center gap-8">
                <h1 className="font-bold text-h text-center">{event?.name}</h1>
                <div className="w-full flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                    <a href={`/user/${organizer?.id}`} className="flex flex-row gap-5 items-center hover:text-custom-dark-blue">
                        <div className="h-full w-[50px] rounded-full overflow-hidden">
                            <img
                                className="min-w-full max-h-full object-cover"
                                src={`${organizer?.img}`}
                                onError={(e: any) => {
                                    e.target.src = `https://api.dicebear.com/8.x/thumbs/svg?seed=${organizer?.id}`;
                                }} />
                        </div>
                        {organizer?.fullname}
                    </a>
                    <div className="flex flex-row gap-5">
                        {categories.map((item, index) => (
                            <div key={index} className="bg-custom-orange px-4 py-1 rounded-lg text-custom-white">{item.name}</div>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    <img
                        className="min-w-full max-h-[400px] object-cover"
                        src={`${imgs != null ?
                            `${imgs[0]}`
                            : `https://api.dicebear.com/8.x/shapes/svg?seed=${event?.id}`}`} />
                </div>
                <div className="w-full flex flex-col gap-4 md:flex-row md:gap-12">
                    <div className="flex felx-row gap-3 items-center">
                        <LocationIcon />
                        {event?.location}onSubmitFeedback
                    </div>
                    <div className="flex felx-row gap-3 items-center">
                        <CalendarIcon color={"#131315"} />
                        {timeForm({ rawDate: event?.dateStart || "" })}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <h2 className="font-bold text-h-2">Overview</h2>
                    <p>{event?.description}</p>
                </div>
                <div className="w-full grid md:grid-cols-2 gap-8 md:gap-5">
                    <div className="w-full flex flex-col gap-5">
                        <h2 className="font-bold text-h-2">Requirements</h2>
                        <p>{event?.requirements}</p>
                    </div>
                    <div className="w-full flex flex-col gap-5">
                        <h2 className="font-bold text-h-2">Preparation</h2>
                        <p>{event?.preparation}</p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="font-bold text-h-2">Attendants</h2>
                        <span>{attendants?.length} attendees</span>
                    </div>
                    <div className="flex flex-row gap-5">
                        {attendants.length === 0 ? (
                            <span>No attendants yet</span>
                        ) : null}
                        {attendants?.map((item, index) => (
                            <AttendantItem key={index} attendant={item} />
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                    <h2 className="font-bold text-h-2">Recommendations for you</h2>
                    {events.length != 0 ? (
                        <div className="w-full flex flex-wrap justify-between gap-x-5 gap-y-12">
                            {events.map((item, index) => (
                                <EventItem key={index} event={item} />
                            ))}
                        </div>
                    ) : (
                        <span>No events found</span>
                    )}
                </div>
                <div className="w-full flex flex-col gap-5">
                    <h2 className="font-bold text-h-2">Feedback</h2>
                    {feedback.length != 0 ? (
                        <div className="w-full flex flex-wrap justify-between gap-x-5 gap-y-12">
                            {feedback.map((item, index) => (
                                <FeedbackItem key={index} PORT={PORT} feedback={item} />
                            ))}
                        </div>
                    ) : (
                        <span>No feedback found</span>
                    )}
                    {isLoggedIn && curruser != null ? (
                        <InputField onSubmit={(newFeedback, rate) => onSubmitFeedback(newFeedback, rate)} />
                    ) : null}
                </div>
            </div>
            {/* sticky */}
            <div className="h-full flex flex-row items-center justify-between bg-custom-white px-12 xl:px-40 py-4 md:mb-[48px] sticky bottom-0">
                <span className="hidden md:block text-custom-dark font-bold text-h-2">
                    {event?.name}
                </span>
                <div className="w-full md:w-auto flex flex-row gap-5 items-center">
                    {event?.price.Valid ? (
                        <span className="text-custom-dark font-bold text-h-2">
                            {event?.price.Float64} ¤
                        </span>
                    ) : (
                        <span className="text-custom-dark font-bold text-h-2">
                            Free
                        </span>
                    )}
                    <button className="border border-custom-dark rounded-lg p-2 hover:bg-custom-bg">
                        <ShareIcon />
                    </button>
                    <button className="border border-custom-dark rounded-lg p-2 hover:bg-custom-bg">
                        <SaveIcon />
                    </button>
                    <button className="flex items-center justify-center bg-custom-dark-blue text-white h-[40px] w-full md:w-40 rounded-lg hover:bg-custom-light-blue active:bg-blue-900">
                        Buy ticket
                    </button>
                </div>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}
export default EventPage;