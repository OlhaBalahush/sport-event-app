import { useParams } from "react-router-dom";
import Header from "./Reusable/Header";
import Footer from "./Reusable/Footer";
import { useEffect, useState } from "react";
import { Category } from "../models/category";
import CategoryItem from "./Reusable/CategoryItem";
import { Challenge } from "../models/challenge";
import ChallengeItem from "./Reusable/ChallengeItem";
import AwardIcon from "./assets/AwardIcon";
import AimIcon from "./assets/AimIcon";
import CalendarIcon from "./assets/CalendarIcon";
import { timeForm } from "../models/timeForm";
import { useAuth } from "./context/AuthContext";
import NewItemField from "./Reusable/AddNewItemField";

interface Props {
    PORT: string;
}

const ChallengesPage = ({ PORT }: Props) => {
    const { isLoggedIn, curruser } = useAuth();
    const [categories, setCategories] = useState<Category[]>([]);
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    useEffect(() => {
        // /api/v1/challenges
        const takeAllChallenges = async () => {
            await fetch(`${PORT}/api/v1/challenges`, {
                method: 'GET',
                credentials: 'include'
            }).then(async response => {
                const res = await response.json();
                console.log(res)
                if (response.ok) {
                    setChallenges(res.data)
                } else {
                    console.error(res.error)
                }
            }).catch(error => {
                console.log('Error taking events:', error);
            })
        }

        takeAllChallenges();
    }, [])

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

    const handleCategory = async (category: string) => {
        // TODO create for challenges
        await fetch(`${PORT}/api/v1/challenges/category/${category}`, {
            method: 'GET',
            credentials: 'include'
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                setChallenges(res.data)
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
                {challenges != null && challenges.length > 0 ? (
                    <a className="w-full md:h-[250px] h-[300px] flex justify-start items-end bg-cover bg-no-repeat"
                        style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0)), url(https://api.dicebear.com/8.x/shapes/svg?seed=${challenges[0].id})` }}>
                        <div className="p-5 w-full text-custom-white">
                            <span className="font-bold text-h">{challenges[0].name}</span>
                            <div className="flex flex-col md:flex-row items-center text-left justify-between gap-5">
                                <div className="flex flex-col md:flex-row gap-5">
                                    <div className="flex flex-row items-center gap-3 text-left">
                                        <AwardIcon color="#FFFFFF" />
                                        {challenges[0].award}
                                    </div>
                                    {/* <div className="flex flex-row items-center gap-3 text-left">
                                        <AimIcon />
                                        {challenges[0].aim}
                                    </div> */}
                                    <div className="flex flex-row items-center gap-3 text-left">
                                        <CalendarIcon color="#FFFFFF" />
                                        {timeForm({ rawDate: challenges[0].deadline })}
                                    </div>
                                </div>
                                <a href={`/challenge/${challenges[0].id}`} className="flex items-center justify-center bg-custom-yellow text-custom-dark h-[40px] w-full md:w-40 rounded-lg hover:bg-custom-orange">
                                    Join
                                </a>
                            </div>
                        </div>
                    </a>
                ) : null}
                <div className="w-full flex-wrap flex gap-5 justify-between xl:justify-evenly">
                    {categories.map((item, index) => (
                        <CategoryItem key={index} category={item.name} handleCategory={handleCategory} />
                    ))}
                </div>
                <div className="w-full flex flex-wrap justify-between gap-x-5 gap-y-12">
                    {isLoggedIn && curruser != null && curruser.role === "admin" ? (
                        <NewItemField type={"challenge"} />
                    ) : null}
                    {challenges === null ? (
                        <span>No challenges yet</span>
                    ) : challenges.length === 1 ? (
                        <span>No more challenges</span>
                    ) : (
                        <>
                            {challenges.slice(1).map((item, index) => (
                                <ChallengeItem key={index} challenge={item} />
                            ))}
                        </>
                    )}
                </div>
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}
export default ChallengesPage;