import { useEffect, useState } from "react";
import { Event } from "../models/event";
import { Category } from "../models/category";
import Header from "./Reusable/Header";
import SearchBar from "./Reusable/SearchBar";
import CategoryItem from "./Reusable/CategoryItem";
import Footer from "./Reusable/Footer";

interface Props {
    PORT: string;
}

const MainPage = ({ PORT }: Props) => {
    const [events, setEvents] = useState<Event[]>([]);
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

    const handleSearch = (query: string) => {
        //  TODO Perform filtering based on the query
    };

    return (
        <div className="w-full absolute min-h-screen">
            <Header />
            <div className="mx-12 my-14 py-12 flex flex-col items-center gap-8">
                <div className="w-full flex gap-5 justify-evenly">
                    {categories.map((item, index) => (
                        <CategoryItem key={index} category={item.Name}/>
                    ))}
                </div>
                <SearchBar onSearch={handleSearch} />
                <div className="flex gap-5 w-full">
                    {filterArray.map((item, index) => (
                        <button key={index} className="bg-custom-bg text-custom-dark px-2 h-full hover:text-custom-dark-blue">
                            {item}
                        </button>
                    ))}
                </div>
                <div className="w-full wrapper flex flex-wrap justify-between gap-x-5 gap-y-12">
                    {events.map((item, index) => (
                        <div key={index}>{item.Name}</div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MainPage;