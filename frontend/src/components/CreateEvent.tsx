import Header from "./Reusable/Header";
import Footer from "./Reusable/Footer";
import { useAuth } from "./context/AuthContext";
import { useState } from "react";
import ImgField from "./Reusable/AddImgField";

interface Props {
    PORT: string;
}

const CreateEvent = ({ PORT }: Props) => {
    const { isLoggedIn, curruser } = useAuth();

    const [name, setName] = useState<string>('');
    const [overview, setOverview] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [imgs, setImgs] = useState<string[]>([]);
    const [location, setLocation] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [requirements, setRequirements] = useState<string>('');
    const [preparation, setPreparation] = useState<string>('');

    const [error, setError] = useState<{ isError: boolean, text: string }>({ isError: false, text: "" });

    const handleSubmit = () => {
        console.log('submit')
    }

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
                        <input
                            type="text"
                            id="categories"
                            // value={name}
                            placeholder="Enter event category"
                            className={`border ${error.isError ? 'border-red-500' : 'border-custom-dark'} rounded-lg px-4 py-2`}
                            // onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <ImgField />
                    <div className="grid md:grid-cols-2 gap-5">
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
export default CreateEvent;