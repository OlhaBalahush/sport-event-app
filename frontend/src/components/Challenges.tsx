import { useParams } from "react-router-dom";

interface Props {
    PORT: string;
}

const ChallengesPage = ({ PORT }: Props) => {
    return(
        <div className="w-full absolute min-h-screen">
            Challenges page
        </div>
    )
}
export default ChallengesPage;