import { useEffect, useState } from "react";
import Logo from "../assets/Logo";
import { error } from "console";
import Footer from "./Footer";

const Header = () => {
    const [location, setLocation] = useState("Kyiv");
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    let lat = position.coords.latitude
                    let long = position.coords.longitude

                    try {
                        await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                            .then(async (response) => {
                                const data = await response.json();
                                console.log(data)
                                setLocation(data.address.city || data.address.town || data.address.country || "Kyiv")
                            })
                            .catch((error) => {
                                console.error('Error while fetching data:', error)
                            })
                    } catch (error) {
                        console.error(error)
                    }
                }, (error) => {
                    console.error(error)
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, [])

    const handleSubmit = () => {
        console.log('submit')
    }

    return (
        <header className="h-14 py-3 px-12 flex justify-between items-center fixed top-0 w-full border-b border-custom-dark bg-custom-bg">
            <div className="flex gap-5 items-center">
                <Logo />
                <form className="ct-form-cont" onSubmit={handleSubmit}>
                    <input
                        id="location"
                        type='text'
                        value={location}
                        placeholder="Location"
                        onChange={(e) => setLocation(e.target.value)}
                        className="font-poppins h-auto border border-custom-dark rounded-lg px-3 py-1 hidden md:block"
                    />
                </form>
            </div>
            <div className={`${showMenu ? 'block' : 'hidden'} md:flex md:relative absolute left-0 md:top-0 top-14 flex items-end md:flex-row md:h-full flex-col gap-5 md:w-auto w-full h-[calc(100vh-56px)] bg-custom-bg px-12 py-12 md:px-0 md:py-0`}>
                <div className="md:hidden">
                    <form className="ct-form-cont" onSubmit={handleSubmit}>
                        <input
                            id="location"
                            type='text'
                            value={location}
                            placeholder="Location"
                            onChange={(e) => setLocation(e.target.value)}
                            className="font-poppins w-full h-auto border border-custom-dark rounded-lg px-5 py-2 block"
                        />
                    </form>
                </div>
                <button className="w-auto bg-custom-bg text-custom-dark px-2 md:h-full hover:text-custom-dark-blue">
                    Events
                </button>
                <button className="bg-custom-bg text-custom-dark px-2 md:h-full hover:text-custom-dark-blue">
                    Challenges
                </button>
                <button className="bg-custom-bg text-custom-dark border border-custom-dark md:h-full w-40 rounded-lg hover:bg-custom-light-blue hover:border-custom-bg hover:text-white active:bg-blue-900">
                    Log In
                </button>
                <button className="bg-custom-dark-blue text-white md:h-full w-40 rounded-lg hover:bg-custom-light-blue active:bg-blue-900">
                    Sign Up
                </button>
                <div className="absolute bottom-0 left-0 w-full md:hidden">
                    <Footer />
                </div>
            </div>
            <div className="md:hidden">
                <button className="text-xl text-custom-dark" onClick={() => setShowMenu(!showMenu)}>
                    {showMenu ? '✕' : '☰'}
                </button>
            </div>
        </header>
    )
}

export default Header;