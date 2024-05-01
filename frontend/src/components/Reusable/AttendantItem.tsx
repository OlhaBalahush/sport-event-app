import { User } from "../../models/user";

interface Props {
    attendant: User;
}

const AttendantItem = ({ attendant }: Props) => {

    return (
        <a href={`/user/${attendant.id}`} className="h-auto max-w-[80px] flex flex-col gap-2 items-center hover:text-custom-dark-blue">
            <div className="w-[80px] aspect-square flex items-center justify-center rounded-full overflow-hidden">
                <img
                    className="w-full h-full object-cover rounded-full"
                    src={`${attendant.img}`}
                    onError={(e: any) => {
                        e.target.src = `https://api.dicebear.com/8.x/thumbs/svg?seed=${attendant.id}`;
                    }}
                    alt="Attendant"
                />
            </div>
            <span className="text-center w-[80px] truncate overflow-hidden">
                {attendant.username}
            </span>
            {attendant.points != 0 ? (
                <span className="font-semibold">{attendant.points} km</span> // TODO defime measure
            ) : null}
        </a>
    )
}

export default AttendantItem;