import Header from "./Reusable/Header";
import Footer from "./Reusable/Footer";
import { useAuth } from "./context/AuthContext";
import { FormEvent, useEffect, useState } from "react";
import FileField from "./Reusable/AddFileField";
import { useNavigate } from "react-router-dom";
import { Category } from "../models/category";
import { filesToBase64Array } from "../models/fileToString";

interface Props {
    PORT: string;
}

const CreateEvent = ({ PORT }: Props) => {
    const { curruser } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [overview, setOverview] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [sugCategories, setSugCategories] = useState<Category[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [imgs, setImgs] = useState<File[]>([]);
    const [location, setLocation] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [requirements, setRequirements] = useState<string>('');
    const [preparation, setPreparation] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [level, setLevel] = useState<string>('');
    const sugLevels = ['Begginer', 'Intermediate', 'Advanced'];

    const [error, setError] = useState<{ isError: boolean, text: string }>({ isError: false, text: "" });

    useEffect(() => {
        const takeAllCatgories = async () => {
            await fetch(`${PORT}/api/v1/categories`, {
                method: 'GET',
                credentials: 'include'
            }).then(async response => {
                const res = await response.json();
                if (response.ok) {
                    setSugCategories(res.data)
                } else {
                    console.error(res.error)
                }
            }).catch(error => {
                console.log('Error taking events:', error);
            })
        }

        takeAllCatgories();
    }, []);

    useEffect(() => {
        if (curruser != null && curruser.role === 'user') {
            navigate('/')
        }
    }, [curruser])

    const handleRemoveCategory = (index: number) => {
        setCategories(prev => {
            const updatedCategories = prev.filter((_, i) => i !== index);
            return updatedCategories;
        });
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const base64Images = await filesToBase64Array(imgs);

        const cdate = new Date(date);

        await fetch(`${PORT}/api/v1/jwt/organizer/events/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                name,
                description: overview,
                dateStart: cdate.toISOString(),
                dateEnd: cdate.toISOString(),
                location,
                requirements,
                preparation,
                imgs: base64Images,
                price: price <= 0 ? {
                    Float64: 0,
                    Valid: false
                } : {
                    Float64: price,
                    Valid: true
                },
                categories,
                level,
            }),
        }).then(async response => {
            const res = await response.json();
            console.log(res)
            if (response.ok) {
                navigate('/')
            } else {
                setError({
                    isError: true,
                    text: res.message
                });
            }
        }).catch(error => {
            console.log(error)
            setError({
                isError: true,
                text: 'Error'
            });
        });
    }


    const handleAddCategory = () => {
        const selectedCategory = sugCategories.find(cat => cat.name === category);

        // Check if category is not already added and if it exists in sugCategories
        if (selectedCategory && !categories.find(cat => cat.id === selectedCategory.id)) {
            setCategories(prev => [...prev, selectedCategory]);
        }
    };

    return (
        <div className="w-full absolute min-h-screen">
            <Header PORT={PORT} />
            <div className="mx-12 xl:mx-40 my-14 py-12 flex flex-col items-center gap-8">
                <h1 className="font-bold text-h">Create event</h1>
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="name" className="">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder="Enter event name"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="level" className="">Expected level:</label>
                        <div className={`w-full h-[42px] bg-white flex flex-row gap-5 items-center border border-custom-dark rounded-lg px-4 py-2`}>
                            <select
                                id="level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className='w-full bg-transparent border-transparent hover:border-transparent active:border-transparent rounded-lg'>
                                {sugLevels.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="overview" className="">Overview:</label>
                        <textarea
                            id="overview"
                            value={overview}
                            placeholder="Enter event overview"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setOverview(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="categories" className="">Categories:</label>
                        <div className={`h-[42px] bg-white flex flex-row gap-5 items-center border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}>
                        <select
                                id="categories"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full bg-transparent border-transparent hover:border-transparent active:border-transparent rounded-lg'>
                                <option disabled key={-1} value={''}>Choose category</option>
                                {sugCategories.map((item, _) => (
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                            <button className="flex items-center justify-center bg-custom-dark-blue text-white h-full rounded-lg hover:bg-custom-light-blue active:bg-blue-900 px-3"
                                type="button"
                                onClick={handleAddCategory}>
                                +
                            </button>
                        </div>
                    </div>
                    {categories.length != 0 ? (
                        <div className="flex flex-wrap gap-5">
                            {categories.map((item, index) => (
                                <div key={index} className="flex flex-row gap-2 items-center w-auto bg-custom-light-blue px-4 py-1 rounded-lg text-custom-white">
                                    {item.name}
                                    <button type="button" onClick={() => handleRemoveCategory(index)}>✕</button>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    <FileField setSelectedImages={setImgs} selectedImages={imgs} type='img' max={6}/>
                    <div className="md:grid md:grid-cols-2 gap-5">
                        <div className='flex flex-col gap-5'>
                            <label htmlFor="location" className="">Location:</label>
                            <input
                                type="location"
                                id="location"
                                value={location}
                                placeholder="Enter event location"
                                className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label htmlFor="date" className="">Date:</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                placeholder="Enter event date"
                                className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="requirements" className="">Requirements:</label>
                        <textarea
                            id="requirements"
                            value={requirements}
                            placeholder="Enter event requirements"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setRequirements(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="preparation" className="">Preparation:</label>
                        <textarea
                            id="preparation"
                            value={preparation}
                            placeholder="Enter event preparation"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setPreparation(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="name" className="">Price:</label>
                        <input
                            type="number"
                            id="name"
                            value={price}
                            placeholder="Enter event price"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                            required
                        />
                    </div>
                    <span className='w-full text-center text-red-500'>
                        {error.isError ? (error.text) : null}
                    </span>
                    <button className='flex items-center justify-center bg-custom-dark-blue text-white h-10 rounded-lg hover:bg-custom-light-blue active:bg-blue-900'
                        type="submit">
                        Create
                    </button>
                </form>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}
export default CreateEvent;