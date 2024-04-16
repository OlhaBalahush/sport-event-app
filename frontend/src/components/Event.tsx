import { useParams } from "react-router-dom";

interface Props {
    PORT: string;
}

const EventPage = ({ PORT }: Props) => {
    const {id} = useParams();
    return(
        <div className="w-full absolute min-h-screen">
            Event page {id}
        </div>
    )
}
export default EventPage;