import Header from "./Reusable/Header";
import Footer from "./Reusable/Footer";
import { useAuth } from "./context/AuthContext";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../models/category";

interface Props {
    PORT: string;
}

const CreateChallenge = ({ PORT }: Props) => {
    const { curruser } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState<string>('');
    const [organizationName, setOrganizationName] = useState<string>('');
    const [organizationLink, setOrganizationLink] = useState<string>('');
    const [overview, setOverview] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([])
    const [sugCategories, setSugCategories] = useState<Category[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [aim, setAim] = useState<string>('');
    const [award, setAward] = useState<string>('');
    const [detailsRules, setDetailsRules] = useState<string>('');

    const [error, setError] = useState<{ isError: boolean, text: string }>({ isError: false, text: "" });

    useEffect(() => {
        if (curruser != null && (curruser.role === 'user' || curruser.role === 'organizator')) {
            navigate('/')
        }
    }, [curruser])

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

    const handleAddCategory = () => {
        const selectedCategory = sugCategories.find(cat => cat.name === category);

        // Check if category is not already added and if it exists in sugCategories
        if (selectedCategory && !categories.find(cat => cat.id === selectedCategory.id)) {
            setCategories(prev => [...prev, selectedCategory]);
        }
    };

    const handleRemoveCategory = (index: number) => {
        setCategories(prev => {
            const updatedCategories = prev.filter((_, i) => i !== index);
            return updatedCategories;
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const deadline = new Date(endDate);

        await fetch(`${PORT}/api/v1/jwt/admin/challenges/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                name,
                organizationName,
                organizationLink,
                deadline: deadline.toISOString(),
                aim,
                award,
                overview,
                detailsRules,
                categories,
            }),
        }).then(async response => {
            const res = await response.json();
            console.log(res)
            if (response.ok) {
                navigate('/challenges')
            } else {
                setError({
                    isError: true,
                    text: res.error
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

    return (
        <div className="w-full absolute min-h-screen">
            <Header PORT={PORT} />
            <div className="mx-12 xl:mx-40 my-14 py-12 flex flex-col items-center gap-8">
                <h1 className="font-bold text-h">Create challenge</h1>
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-4'>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="name" className="">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder="Enter challenge name"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="organizationName" className="">Organization information:</label>
                        <input
                            type="text"
                            id="organizationName"
                            value={organizationName}
                            placeholder="Enter challenge organization name"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setOrganizationName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            id="link"
                            value={organizationLink}
                            placeholder="Enter challenge organization link"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setOrganizationLink(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="overview" className="">Overview:</label>
                        <textarea
                            id="overview"
                            value={overview}
                            placeholder="Enter challenge overview"
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
                                {sugCategories.map((item, _) => (
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                            <button className="flex items-center justify-center bg-custom-dark-blue text-white h-full rounded-lg hover:bg-custom-light-blue active:bg-blue-900 px-3"
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
                                    <button onClick={() => handleRemoveCategory(index)}>✕</button>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="aim" className="">Aim:</label>
                        <input
                            type="text"
                            id="aim"
                            value={aim}
                            placeholder="Enter challenge aim"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setAim(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="date" className="">Dates:</label>
                        <div className="grid md:grid-cols-2 gap-5">
                            <input
                                type="date"
                                id="start-date"
                                value={startDate}
                                placeholder="Enter challenge start date"
                                className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                            <input
                                type="date"
                                id="end-date"
                                value={endDate}
                                placeholder="Enter challenge end date"
                                className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="award" className="">Award:</label>
                        <input
                            type="text"
                            id="award"
                            value={award}
                            placeholder="Enter challenge award"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setAward(e.target.value)}
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label htmlFor="details-rules" className="">Details & Rules:</label>
                        <textarea
                            id="details-rules"
                            value={detailsRules}
                            placeholder="Enter challenge details & rules"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            onChange={(e) => setDetailsRules(e.target.value)}
                            required
                        />
                    </div>
                    <span className='w-full text-center text-red-500'>
                        {error.isError ? (error.text) : null}
                    </span>
                    <button className='flex items-center justify-center bg-custom-dark-blue text-white h-10 rounded-lg hover:bg-custom-light-blue active:bg-blue-900' type="submit">Create</button>
                </form>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}
export default CreateChallenge;