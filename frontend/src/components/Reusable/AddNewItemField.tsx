import AddIcon from "../assets/Add";

interface Props {
    type: string;
}

const NewItemField = ({ type }: Props) => {
    return (
        <a className={`w-full h-full min-h-[10rem] border border-dashed border-custom-dark rounded-lg flex flex-col justify-center items-center gap-2 text-center`} 
        href={`create-${type}`}>
            <AddIcon />
            <span>Add new {type}</span>
        </a>
    );
};

export default NewItemField;
