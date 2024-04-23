import { Event } from "../../models/event";
import { timeForm } from "../../models/timeForm";

interface Props {
    event: Event;
}

const EventItem = ({ event }: Props) => {
    return (
        <a className='w-full min-w-[17rem] max-w-[24rem] flex flex-col items-center gap-2 text-center' href={`/event/${event.id}`}>
            <div className="w-full max-h-[15rem]">
                <img
                    className="min-w-full max-h-full object-cover"
                    // TODO take event imgs ?
                    src={`${event?.imgs != null ?
                        `${event?.imgs[0]}`
                        : `https://api.dicebear.com/8.x/shapes/svg?seed=${event?.id}`}`} />
            </div>
            <div className="w-full flex flex-row justify-between">
                <div>
                    {timeForm({ rawDate: event?.dateStart || "" })}
                </div>
                <div>
                    {event.attendees} attendees
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
                    {event.price.Valid ? (
                        <span>{event.price.Float64} ¤</span>
                    ) : (
                        <span>Free</span>
                    )}
                </div>
            </div>
        </a>
    );
};

export default EventItem;
