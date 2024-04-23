import Header from "./Reusable/Header";
import Footer from "./Reusable/Footer";
import { useAuth } from "./context/AuthContext";

interface Props {
    PORT: string;
}

const Notifications = ({ PORT }: Props) => {
    const { isLoggedIn, curruser } = useAuth();

    return (
        <div className="w-full absolute min-h-screen">
            <Header PORT={PORT} />
            <div className="mx-12 xl:mx-40 my-14 py-12 flex flex-col items-center gap-8">
                Notifications
            </div>
            <div className="hidden md:block">
                <Footer />
            </div>
        </div>
    )
}
export default Notifications;