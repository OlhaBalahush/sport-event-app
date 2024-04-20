import { useParams } from "react-router-dom";
import Header from "./Reusable/Header";
import Footer from "./Reusable/Footer";
import { useEffect, useState } from "react";
import { Event } from "../models/event";
import { User } from "../models/user";
import { timeForm } from "../models/timeForm";
import LocationIcon from "./assets/Location";
import CalendarIcon from "./assets/CalendarIcon";

interface Props {
    PORT: string;
}

const EventPage = ({ PORT }: Props) => {
    const { id } = useParams();
    const [event, setEvent] = useState<Event>();
    const [organizer, setOrganizer] = useState<User>();
    const [attendants, setAttendants] = useState<User[]>();

    useEffect(() => {
        const takeEvent = async () => {
            await fetch(`${PORT}/api/v1/event/${id}`, {
                method: 'GET',
                credentials: 'include'
            }).then(async response => {
                const res = await response.json();
                console.log(res)
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
        }
        // TODO get event's categories
        // TODO get event's imgs 
        // TODO get event's recomendations
        // TODO get event's feedback  
    }, [event]);

    const takeOrganizer = async () => {
        await fetch(`${PORT}/api/v1/users/${event?.organizerId}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            console.log(res)
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
            console.log(res)
            if (response.ok) {
                setAttendants(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking event:', error);
        })
    }

    return (
        <div className="w-full absolute min-h-screen">
            <Header PORT={PORT} />
            <div className="mx-12 xl:mx-40 my-14 py-12 flex flex-col items-center gap-8">
                <h1 className="font-bold text-h">{event?.name}</h1>
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-5 items-center">
                        <div className="h-full w-[50px] rounded-full overflow-hidden">
                            <img
                                className="min-w-full max-h-full object-cover"
                                src={`${organizer?.img != "" ?
                                    `${organizer?.img}`
                                    : `https://api.dicebear.com/8.x/thumbs/svg?seed=${organizer?.id}`}`} />
                        </div>
                        {organizer?.fullname}
                    </div>
                    <div className="bg-custom-orange px-4 py-1 rounded-lg text-custom-white">
                        category
                    </div>
                </div>
                <div className="w-full">
                    <img
                        className="min-w-full max-h-[400px] object-cover"
                        src={`${event?.imgs != null ?
                            `${event?.imgs[0]}`
                            : `https://api.dicebear.com/8.x/shapes/svg?seed=${event?.id}`}`} />
                </div>
                <div className="w-full flex flex-row gap-12">
                    <div className="flex felx-row gap-3 items-center">
                        <LocationIcon />
                        {event?.location}
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
                <div className="w-full grid grid-cols-2 gap-5">
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
                        {attendants?.map((item, index) => (
                            <div className="flex flex-col gap-3 items-center">
                                <div className="h-full w-[80px] rounded-full overflow-hidden">
                                    <img
                                        className="min-w-full max-h-full object-cover rounded-full"
                                        src={`${item.img != '' ?
                                            `${item.img}`
                                            : `https://api.dicebear.com/8.x/thumbs/svg?seed=${item.id}`}`} />
                                </div>
                                {item.username}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="font-bold text-h-2">Recommendations for you</h2>
                    <div></div>
                </div>
                <div className="w-full">
                    <h2 className="font-bold text-h-2">Feedback</h2>
                    <div></div>
                </div>
            </div>
            {/* sticky */}
            <div className="h-full flex flex-row justify-between bg-custom-white px-12 xl:px-40 py-4 mb-[48px] sticky bottom-0">
                <div>{event?.name}</div>
                <div className="flex flex-row gap-5 items-center">
                    {event?.price.Valid ? (
                        <span>{event?.price.Float64} ¤</span>
                    ) : (
                        <span>Free</span>
                    )}
                    <button>share</button>
                    <button>save</button>
                    <button>buy</button>
                </div>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}
export default EventPage;