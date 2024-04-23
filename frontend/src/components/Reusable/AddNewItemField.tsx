import AddIcon from "../assets/Add";

interface Props {
    type: string;
}

const NewItemField = ({ type }: Props) => {
    return (
        <a className='w-full min-w-[17rem] max-w-[24rem] min-h-[17rem] border border-dashed border-custom-dark rounded-lg flex flex-col justify-center items-center gap-2 text-center' href="create-event">
            <AddIcon />
            <span>Add new {type}</span>
        </a>
    );
};

export default NewItemField;
