import { useParams } from "react-router-dom";

interface Props {
    PORT: string;
}

const UserPage = ({ PORT }: Props) => {
    const {id} = useParams();
    return(
        <div className="w-full absolute min-h-screen">
            User page {id}
        </div>
    )
}
export default UserPage;