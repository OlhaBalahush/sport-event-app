import { useEffect, useState } from "react";
import { Event } from "../models/event";
import { Category } from "../models/category";
import Header from "./Reusable/Header";
import SearchBar from "./Reusable/SearchBar";
import CategoryItem from "./Reusable/CategoryItem";
import Footer from "./Reusable/Footer";
import EventItem from "./Reusable/EventItem";
import NewItemField from "./Reusable/AddNewItemField";
import { useAuth } from "./context/AuthContext";
import { getWeekNumber } from "../models/timeForm";

interface Props {
    PORT: string;
}

const MainPage = ({ PORT }: Props) => {
    const { isLoggedIn, curruser } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [currEvents, setCurrEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filter, setFilter] = useState<number>(0);

    const filterArray = ['All', 'For you', 'For beginners', 'Today', 'This week', 'This mouth', 'Free'];

    useEffect(() => {
        const takeAllEvents = async () => {
            await fetch(`${PORT}/api/v1/events`, {
                method: 'GET',
                credentials: 'include'
            }).then(async response => {
                const res = await response.json();
                console.log(res)
                if (response.ok) {
                    setEvents(res.data)
                    setCurrEvents(res.data);
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
        const takeAllCatgories = async () => {
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

        takeAllCatgories();
    }, []);

    const handleSearch = (query: string) => {
        console.log(query)
        const newEvents = events.filter(event =>
            event.name.toLowerCase().includes(query.toLowerCase()) ||
            event.description.toLowerCase().includes(query.toLowerCase()) ||
            event.location.toLowerCase().includes(query.toLowerCase()) ||
            event.preparation.toLowerCase().includes(query.toLowerCase()) ||
            event.requirements.toLowerCase().includes(query.toLowerCase())
        );
        setCurrEvents(newEvents);
    };

    const handleFilter = (filter: string) => {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        switch (filter.toLowerCase()) {
            case 'all':
                console.log('all');
                setCurrEvents(events);
                setFilter(0)
                break;
            case 'for you':
                //TODO implement recommendations algorithm
                console.log('for you');
                setFilter(1)
                break;
            case 'for beginners':
                //TODO implement events levels in be part firstly
                console.log('for beginners');
                setFilter(2)
                break;
            case 'today':
                const filteredEventsToday = events.filter(event => {
                    const eventDate = new Date(event.dateStart);
                    // Set the time of the event's date to midnight
                    eventDate.setHours(0, 0, 0, 0);
                    // Compare if the event's date is equal to today's date
                    return eventDate.getTime() === today.getTime();
                });

                setCurrEvents(filteredEventsToday);
                setFilter(3)
                break;
            case 'this week':
                const currentWeekNumber = getWeekNumber(today);

                const filteredEventsThisWeek = events.filter(event => {
                    const eventWeekNumber = getWeekNumber(new Date(event.dateStart));
                    // Compare if the event's week number is equal to the current week number
                    return eventWeekNumber === currentWeekNumber;
                });


                setCurrEvents(filteredEventsThisWeek);
                setFilter(4)
                break;
            case 'this mouth':
                const currentMonth = today.getMonth(); // 0-indexed, January is 0
                const currentYear = today.getFullYear();

                const filteredEventsThisMonth = events.filter(event => {
                    const eventDate = new Date(event.dateStart);
                    const eventMonth = eventDate.getMonth();
                    const eventYear = eventDate.getFullYear();
                    // Compare if the event's month and year are equal to the current month and year
                    return eventMonth === currentMonth && eventYear === currentYear;
                });

                setCurrEvents(filteredEventsThisMonth);
                setFilter(5)
                break;
            case 'free':
                const filteredFree = events.filter(event => !event.price.Valid);
                setCurrEvents(filteredFree);
                setFilter(6)
                break;
        }
    }

    const handleCategory = async (category: string) => {
        await fetch(`${PORT}/api/v1/events/category/${category}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                setCurrEvents(res.data);
            } else {
                console.error(res.error)
            }
        }).catch(error => {
            console.log('Error taking events:', error);
        })
    }

    return (
        <div className="w-full absolute min-h-screen">
            <Header PORT={PORT} />
            <div className="mx-12 xl:mx-40 my-14 py-12 flex flex-col items-center gap-8">
                <div className="w-full flex-wrap flex gap-5 justify-between xl:justify-evenly">
                    {categories.map((item, index) => (
                        <CategoryItem key={index} category={item.name} handleCategory={handleCategory} />
                    ))}
                </div>
                <SearchBar onSearch={handleSearch} />
                {/* TODO make icon for responsive filter */}
                <div className="hidden md:flex gap-5 w-full">
                    {filterArray.map((item, index) => (
                        <button key={index}
                            className={`bg-custom-bg ${filter === index ? 'text-custom-dark-blue' : 'text-custom-dark'} px-2 h-full hover:text-custom-dark-blue`}
                            onClick={() => handleFilter(item)}>
                            {item}
                        </button>
                    ))}
                </div>
                <div className="w-full grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    {isLoggedIn && curruser != null && curruser.role != "user" ? (
                        <NewItemField type={"event"} />
                    ) : null}
                    {currEvents != null ? (
                        <>
                            {currEvents.map((item, index) => (
                                <EventItem key={index} event={item} />
                            ))}
                        </>
                    ) : (
                        <span>No events found</span>
                    )}
                </div>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}

export default MainPage;