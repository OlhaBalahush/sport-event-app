import { useEffect, useState } from "react";
import { Event } from "../models/event";
import { Category } from "../models/category";
import Header from "./Reusable/Header";

interface Props {
    PORT: string;
}

const MainPage = ({ PORT }: Props) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const takeAllEvents = async () => {
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

        takeAllEvents();
    }, []);

    useEffect(() => {
        const takeAllEvents = async () => {
            await fetch(`${PORT}/api/v1/categories`, {
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

        takeAllEvents();
    }, []);

    return (
        <>
            <Header />
            <div className="mt-14 py-12 mx-12 flex flex-col items-center">
                Main page
            </div>
        </>
    )
}

export default MainPage;