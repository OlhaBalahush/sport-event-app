import { Event } from "../../models/event";

interface Props {
    event: Event;
}

const EventItem = ({ event }: Props) => {

    const date = new Date(event?.DateStart)

    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

    return (
        <div className='flex flex-col items-center gap-2 text-center'>
            <div className="min-w-[17rem] max-w-[24rem] max-h-[15rem]">
                <img
                    className="min-w-full max-h-full object-cover"
                    src={`${event?.Imgs != null ?
                        `${event?.Imgs[0]}`
                        : `https://api.dicebear.com/8.x/thumbs/svg?seed=${event?.ID}`}`} />
            </div>
            <div className="w-full flex flex-row justify-between">
                <div>
                    {formattedDate} | {formattedTime}
                </div>
                <div>
                    {event?.Attendants < 5 || event?.Attendants == null ? '5' : event.Attendants} attendees
                </div>
            </div>
            <div className="w-full text-left font-bold">
                {event?.Name}
            </div>
            <div className="w-full flex flex-row justify-between">
                <div>
                    {event?.Location}
                </div>
                <div>
                    Price
                </div>
            </div>
        </div>
    );
};

export default EventItem;
