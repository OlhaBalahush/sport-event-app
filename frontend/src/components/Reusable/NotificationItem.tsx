import { useEffect, useState } from "react";
import { Notification } from "../../models/notification";
import { Request } from "../../models/request";
import { User } from "../../models/user";
import NRequestPopup from "./NRequestPopup";

interface Props {
    PORT: string;
    isRequest: boolean;
    notification?: Notification;
    request?: Request;
    removeEntity?: (id: number) => void;
}

const NotificationItem = ({ PORT, isRequest, notification, request, removeEntity }: Props) => {

    const [user, setUser] = useState<User>();
    const [isRequestPopup, setRequestPopup] = useState(false);

    useEffect(() => {
        takeUser()
    }, [])

    const takeUser = async () => {
        let id = isRequest ? request?.userId : 0 // TODO change to notification senderID

        await fetch(`${PORT}/api/v1/users/${id}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            console.log(res)
            if (response.ok) {
                setUser(res.data)
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking user:', error);
        })
    }

    const toogleRequestPopup = (res: boolean, id: number) => {
        setRequestPopup(prev => !prev)
        if (res && removeEntity != undefined) {
            removeEntity(id)
        }
    }

    return (
        <div className='w-full'>
            {isRequest ? (
                <>
                    <div className="flex flex-row gap-5 justify-between">
                        <div className="flex flex-row gap-2 items-center">
                            <a href={`/user/${user?.id}`} className="flex flex-row gap-5 items-center hover:text-custom-dark-blue">
                                <div className="h-full w-[50px] flex items-center justify-center aspect-square rounded-full overflow-hidden">
                                    <img
                                        className="min-w-full max-h-full object-cover"
                                        src={`${user?.img}`}
                                        onError={(e: any) => {
                                            e.target.src = `https://api.dicebear.com/8.x/thumbs/svg?seed=${user?.id}`;
                                        }} />
                                </div>
                                {user?.fullname}
                            </a>
                            <span> sent request for organizer</span>
                        </div>
                        <button
                            onClick={() => toogleRequestPopup(false, -1)}
                            className="flex items-center justify-center bg-custom-dark-blue text-white h-[40px] w-40 rounded-lg hover:bg-custom-light-blue active:bg-blue-900">
                            Check details
                        </button>
                    </div>
                    {isRequestPopup && request ? (
                        <NRequestPopup PORT={PORT} onClose={(res, id) => toogleRequestPopup(res, id)} request={request} user={user} />
                    ) : null}
                </>
            ) : notification?.data.type === 'recommendation' ? (
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2 items-center">Recommended for you:
                        <a href={`/user/${notification?.data.userID}`} className="flex flex-row gap-5 items-center hover:text-custom-dark-blue">
                            {notification?.data.username}
                        </a>created new event </div>
                    <a href={`/event/${notification?.data.eventID}`} className="flex flex-row gap-5 items-center hover:text-custom-dark-blue">
                        {notification?.data.eventName}
                        <div className="h-full w-[50px] flex items-center justify-center aspect-square rounded-full overflow-hidden">
                            <img
                                className="min-w-full max-h-full object-cover"
                                src={`${user?.img}`}
                                onError={(e: any) => {
                                    e.target.src = `https://api.dicebear.com/8.x/shapes/svg?seed=${notification?.data.eventID}`;
                                }} />
                        </div>
                    </a>
                </div>
            ) : notification?.data.type === 'joining' ? (
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <a href={`/user/${notification?.data.userID}`} className="flex flex-row gap-5 items-center hover:text-custom-dark-blue">
                            <div className="h-full w-[50px] flex items-center justify-center aspect-square rounded-full overflow-hidden">
                                <img
                                    className="min-w-full max-h-full object-cover"
                                    src={`${notification?.data.userImg}`}
                                    onError={(e: any) => {
                                        e.target.src = `https://api.dicebear.com/8.x/thumbs/svg?seed=${notification?.data.userID}`;
                                    }} />
                            </div>
                            {notification?.data.username}
                        </a>
                        <span> joined your event</span>
                    </div>
                    <a href={`/event/${notification?.data.eventID}`} className="flex flex-row gap-5 items-center hover:text-custom-dark-blue">
                        {notification?.data.eventName}
                        <div className="h-full w-[50px] flex items-center justify-center aspect-square rounded-full overflow-hidden">
                            <img
                                className="min-w-full max-h-full object-cover"
                                src={`${user?.img}`}
                                onError={(e: any) => {
                                    e.target.src = `https://api.dicebear.com/8.x/shapes/svg?seed=${notification?.data.eventID}`;
                                }} />
                        </div>
                    </a>
                </div>
            ) : null}
        </div>
    );
};

export default NotificationItem;
