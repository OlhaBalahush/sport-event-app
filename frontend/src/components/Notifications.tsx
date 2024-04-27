import Header from "./Reusable/Header";
import Footer from "./Reusable/Footer";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { Request } from "../models/request";
import { Notification } from "../models/notification";
import NotificationItem from "./Reusable/NotificationItem";

interface Props {
    PORT: string;
}

const Notifications = ({ PORT }: Props) => {
    const { isLoggedIn, curruser } = useAuth();

    const [requests, setRequests] = useState<Request[]>([]);
    const [unreadN, setUnreadN] = useState<Notification[]>([]);
    const [readN, setReadN] = useState<Notification[]>([]);

    useEffect(() => {
        if (isLoggedIn && curruser != null) {
            if (curruser.role === 'admin') {
                takeRequests()
                takeNotifications()
            }
        }
    }, [curruser])

    const takeRequests = async () => {
        await fetch(`${PORT}/api/v1/jwt/admin/requests`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            console.log(res)
            if (response.ok) {
                if (res.data != null) {
                    setRequests(res.data)
                }
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking requests:', error);
        })
    }
    
    const takeNotifications = () => {
        console.log('take notifications');
    }

    const handleUpdateRequests = (id: number) => {
        // Filter out the request with the given id
        const updatedRequests = requests.filter(request => request.id !== id);
        setRequests(updatedRequests);
    }    

    return (
        <div className="w-full absolute min-h-screen">
            <Header PORT={PORT} />
            <div className="mx-12 xl:mx-40 my-14 py-12 flex flex-col items-center gap-8">
                <h1 className="text-h font-bold">Notifications</h1>
                <div className="w-full flex flex-col gap-5">
                    {curruser?.role === 'admin' ? (
                        <div className="w-full flex flex-col gap-5">
                            <h2 className="text-h-2 font-bold">Requests</h2>
                            {unreadN.length != 0 ? (
                                <>
                                    {requests.map((item, index) => (
                                        <NotificationItem key={index} PORT={PORT} isRequest={true} request={item} removeEntity={(id) => handleUpdateRequests(id)}/>
                                    ))}
                                </>
                            ) : (
                                <span>No requests yet.</span>
                            )}
                        </div>
                    ) : null}
                    <h2 className="text-h-2 font-bold">Unread</h2>
                    {unreadN.length != 0 ? (
                        <>
                            {unreadN.map((item, index) => (
                                <NotificationItem key={index} PORT={PORT} isRequest={false} notification={item} />
                            ))}
                        </>
                    ) : (
                        <span>No notifications yet.</span>
                    )}
                    {readN.length != 0 ? (
                        <>
                            <h2 className="text-h-2 font-bold">Read</h2>
                            {readN.map((item, index) => (
                                <NotificationItem key={index} PORT={PORT} isRequest={false} notification={item} />
                            ))}
                        </>
                    ) : null}
                </div>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}
export default Notifications;