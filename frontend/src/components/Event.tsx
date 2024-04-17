import { useParams } from "react-router-dom";
import Header from "./Reusable/Header";
import Footer from "./Reusable/Footer";

interface Props {
    PORT: string;
}

const EventPage = ({ PORT }: Props) => {
    const {id} = useParams();
    return(
        <div className="w-full absolute min-h-screen">
            <Header PORT={PORT} />
            <div className="mx-12 xl:mx-40 my-14 py-12 flex flex-col items-center gap-8">
                Event page
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}
export default EventPage;