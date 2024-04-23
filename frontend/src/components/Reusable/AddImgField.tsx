import DownloadIcon from "../assets/Download";

const ImgField = () => {
    return (
        <a className='w-full min-h-[10rem] bg-white border border-dashed border-custom-dark rounded-lg flex flex-col justify-center items-center gap-2 text-center' href="create-event">
            <DownloadIcon />
            <span>Select or drag file to upload</span>
        </a>
    );
};

export default ImgField;
