import { Event } from "../../models/event";
import { timeForm } from "../../models/timeForm";

interface Props {
    event: Event;
}

const EventItem = ({ event }: Props) => {

    const date = new Date(event?.dateStart)

    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    return (
        <a className='flex flex-col items-center gap-2 text-center' href={`/event/${event.id}`}>
            <div className="min-w-[17rem] max-w-[24rem] max-h-[15rem]">
                <img
                    className="min-w-full max-h-full object-cover"
                    src={`${event?.imgs != null ?
                        `${event?.imgs[0]}`
                        : `https://api.dicebear.com/8.x/shapes/svg?seed=${event?.id}`}`} />
            </div>
            <div className="w-full flex flex-row justify-between">
                <div>
                    {timeForm({ rawDate: event?.dateStart || "" })}
                </div>
                <div>
                    {event?.attendants < 5 || event?.attendants == null ? '5' : event.attendants} attendees
                </div>
            </div>
            <div className="w-full text-left font-bold">
                {event?.name}
            </div>
            <div className="w-full flex flex-row justify-between">
                <div>
                    {event?.location}
                </div>
                <div>
                    Price
                </div>
            </div>
        </a>
    );
};

export default EventItem;
