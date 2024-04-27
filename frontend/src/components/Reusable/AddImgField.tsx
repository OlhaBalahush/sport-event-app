import { Dispatch, SetStateAction, useState } from "react";
import DownloadIcon from "../assets/Download";

interface Props {
    setSelectedImages: Dispatch<SetStateAction<File[]>>;
    selectedImages: File[];
    max: number;
} 

const ImgField = ({setSelectedImages, selectedImages, max}: Props) => {
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<{ isError: boolean, text: string }>({ isError: false, text: "" });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedImages.length === max) {
            setError({
                isError: true,
                text: `Only ${max} pictures can be uploaded`
            });
            return
        }
        if (e.target.files) {
            setSelectedImages([...selectedImages, ...Array.from(e.target.files)]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        if (selectedImages.length === max) {
            setError({
                isError: true,
                text: `Only ${max} pictures can be uploaded`
            });
            return
        }
        if (e.dataTransfer.files) {
            setSelectedImages([...selectedImages, ...Array.from(e.dataTransfer.files)]);
        }
    };

    const removeImageAtIndex = (index: number) => {
        setSelectedImages(currentImages => currentImages.filter((_, idx) => idx !== index));
    };

    return (
        <div
            className='w-full px-10 py-5 min-h-[10rem] bg-white border border-dashed border-custom-dark rounded-lg flex flex-col justify-center items-center gap-2 text-center'
            onDragOver={handleDragOver}
            onDrop={handleDrop}>
            {selectedImages.length === 0 ? (
                <DownloadIcon />
            ) : (
                <div className="flex flex-wrap gap-5">
                    {selectedImages.map((file, index) => (
                        <div className="py-1 px-2 flex items-start justify-end w-[80px] h-[80px] rounded-lg overflow-hidden bg-cover bg-no-repeat"
                            key={index} onClick={() => removeImageAtIndex(index)}
                            style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${URL.createObjectURL(file)})` }}>
                            <span className="text-white">×</span>
                        </div>
                    ))}
                </div>
            )}
            <label className="upload-label">
                <div>Select or drag file to upload</div>
                {error.isError ? (
                    <div className="text-red-500">{error.text}</div>
                ) : null}
                <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    multiple
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />
            </label>
        </div>
    );
};

export default ImgField;
