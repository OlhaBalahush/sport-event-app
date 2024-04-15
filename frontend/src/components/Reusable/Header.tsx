import { useEffect, useState } from "react";
import Logo from "../assets/Logo";
import { error } from "console";

const Header = () => {
    const [location, setLocation] = useState("Kyiv");

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
                        className="font-poppins h-auto border border-custom-dark rounded-lg px-1 py-1"
                    />
                </form>
            </div>
            <div className="flex gap-5 h-full">
                <button className="bg-custom-bg text-custom-dark px-2 h-full hover:text-custom-dark-blue">
                    Events
                </button>
                <button className="bg-custom-bg text-custom-dark px-2 h-full hover:text-custom-dark-blue">
                    Challenges
                </button>
                <button className="bg-custom-bg text-custom-dark border border-custom-dark h-full w-40 rounded-lg hover:bg-custom-light-blue hover:border-custom-bg hover:text-white active:bg-blue-900">
                    Log In
                </button>
                <button className="bg-custom-dark-blue text-white h-full w-40 rounded-lg hover:bg-custom-light-blue active:bg-blue-900">
                    Sign Up
                </button>
            </div>
        </header>
    )
}

export default Header;