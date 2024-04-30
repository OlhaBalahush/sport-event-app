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

interface Props {
    PORT: string;
}

const MainPage = ({ PORT }: Props) => {
    const { isLoggedIn, curruser } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [currEvents, setCurrEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchResults, setSearchResults] = useState([]);

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

    const handleCategory = async (category: string) => {
        await fetch(`${PORT}/api/v1/events/category/${category}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                setEvents(res.data);
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
                        <button key={index} className="bg-custom-bg text-custom-dark px-2 h-full hover:text-custom-dark-blue">
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