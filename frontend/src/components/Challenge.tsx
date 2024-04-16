import { useParams } from "react-router-dom";

interface Props {
    PORT: string;
}

const ChallengePage = ({ PORT }: Props) => {
    const {id} = useParams();
    return(
        <div className="w-full absolute min-h-screen">
            Challenge page {id}
        </div>
    )
}
export default ChallengePage;