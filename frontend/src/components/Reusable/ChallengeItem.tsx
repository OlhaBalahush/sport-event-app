import { Challenge } from "../../models/challenge";
import AimIcon from "../assets/AimIcon";
import categoriesIcons from "../assets/CategoriesIcons";

interface Props {
    challenge: Challenge;
}

const ChallengeItem = ({ challenge }: Props) => {

    return (
        <a href={`/challenge/${challenge.id}`} className='w-[280px] flex flex-col items-center gap-2 text-center'>
            <div className="w-full h-28 flex justify-center items-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://api.dicebear.com/8.x/shapes/svg?seed=${challenge.id})` }}>
                <div className="w-20 h-20 flex justify-center items-center">
                    <img
                        className="min-w-full max-h-full object-cover"
                        src={`${challenge.img.Valid != false ?
                            `${challenge.img}`
                            : `https://api.dicebear.com/8.x/thumbs/svg?seed=${challenge.name}`}`} />
                </div>
            </div>
            <span className="w-full text-left font-bold text-h-2">{challenge.name}</span>
            <div className="flex flex-row gap-3 text-left">
                <AimIcon />
                {challenge.aim}
            </div>
            <button className="flex items-center justify-center bg-custom-dark-blue text-white h-[40px] w-full rounded-lg hover:bg-custom-light-blue active:bg-blue-900">
                Join
            </button>
        </a>
    );
};

export default ChallengeItem;
