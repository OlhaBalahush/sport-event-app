import { FormEvent, SetStateAction, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../../models/user';
import Google from '../assets/Google';
import Github from '../assets/Github';
import Logo from '../assets/Logo';
import { Category } from '../../models/category';
import ImgField from '../Reusable/AddImgField';
import { filesToBase64Array } from '../../models/fileToString';

interface Props {
    PORT: string;
    onClose: () => void;
}

const SetUpPopup = ({ PORT, onClose }: Props) => {
    const { curruser } = useAuth();
    const [img, setImg] = useState<File[]>([]);
    const sugLevels = ['Begginer', 'Intermediate', 'Advanced']
    const [level, setLevel] = useState<string>(sugLevels[0]);
    const [category, setCategory] = useState<string>('');
    const [sugCategories, setSugCategories] = useState<Category[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<{ isError: boolean, text: string }>({ isError: false, text: "" });

    useEffect(() => {
        const takeAllCatgories = async () => {
            await fetch(`${PORT}/api/v1/categories`, {
                method: 'GET',
                credentials: 'include'
            }).then(async response => {
                const res = await response.json();
                if (response.ok) {
                    setSugCategories(res.data)
                } else {
                    console.error(res.error)
                }
            }).catch(error => {
                console.log('Error taking events:', error);
            })
        }

        takeAllCatgories();
    }, []);

    const handleAddCategory = () => {
        const selectedCategory = sugCategories.find(cat => cat.name === category);

        // Check if category is not already added and if it exists in sugCategories
        if (selectedCategory && !categories.find(cat => cat.id === selectedCategory.id)) {
            setCategories(prev => [...prev, selectedCategory]);
        }
    };

    const handleRemoveCategory = (index: number) => {
        setCategories(prev => {
            const updatedCategories = prev.filter((_, i) => i !== index);
            return updatedCategories;
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const base64Images = await filesToBase64Array(img);
        await fetch(`${PORT}/api/v1/jwt/users/update`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                id: curruser ? curruser.id : '',
                fullname: curruser ? curruser.fullname : '',
                username: curruser ? curruser.username : '',
                email: curruser ? curruser.email : '',
                role: curruser ? curruser.role : '',
                img: base64Images[0],
                level,
                categories,
            }),
        }).then(async response => {
            const res = await response.json();
            if (response.ok) {
                onClose();
            } else {
                setError({
                    isError: true,
                    text: res.error
                });
            }
        }).catch(error => {
            console.log(error)
            setError({
                isError: true,
                text: 'Error'
            });
        });
    }

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-start lg:items-center justify-center z-50 bg-opacity-50 bg-gray-900">
            <div className="relative flex flex-col gap-5 bg-custom-white py-8 px-5 md:p-8 rounded-t-2xl min-w-[330px] w-[540px] mt-20 lg:mt-0 md:rounded-2xl">
                <button className='absolute md:right-8 right-5' onClick={onClose}>✕</button>
                <div className='flex flex-col items-center gap-5'>
                    <Logo />
                    <h1 className='text-center font-bold text-h'>Fille your preferences</h1>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='w-full flex flex-row gap-5 justify-between items-center'>
                        <label htmlFor="level" className="">Level:</label>
                        <div className={`w-full h-[42px] bg-white flex flex-row gap-5 items-center border rounded-lg px-4 py-2`}>
                            <select
                                id="categories"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className='w-full bg-transparent border-transparent hover:border-transparent active:border-transparent rounded-lg'>
                                {sugLevels.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-5'>
                        <label htmlFor="categories" className="">Categories:</label>
                        <div className={`w-full h-[42px] bg-white flex flex-row gap-5 items-center border rounded-lg px-4 py-2`}>
                            <select
                                id="categories"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full bg-transparent border-transparent hover:border-transparent active:border-transparent rounded-lg'>
                                <option disabled key={-1} value={''}>Choose category</option>
                                {sugCategories.map((item, _) => (
                                    <option key={item.id} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                            <button className="flex items-center justify-center bg-custom-dark-blue text-white h-full rounded-lg hover:bg-custom-light-blue active:bg-blue-900 px-3"
                                type="button"
                                onClick={handleAddCategory}>
                                +
                            </button>
                        </div>
                    </div>
                    {categories.length != 0 ? (
                        <div className="flex flex-wrap gap-5">
                            {categories.map((item, index) => (
                                <div key={index} className="flex flex-row gap-2 items-center w-auto bg-custom-light-blue px-4 py-1 rounded-lg text-custom-white">
                                    {item.name}
                                    <button type='button' onClick={() => handleRemoveCategory(index)}>✕</button>
                                </div>
                            ))}
                        </div>
                    ) : null}
                    <ImgField setSelectedImages={setImg} selectedImages={img} max={1} />
                    <span className='w-full text-center text-red-500'>
                        {error.isError ? (error.text) : null}
                    </span>
                    <button className='flex items-center justify-center bg-custom-dark-blue text-white h-10 rounded-lg hover:bg-custom-light-blue active:bg-blue-900' type="submit">Done</button>
                </form>
                <button className='text-custom-dark px-2 md:h-full hover:text-custom-dark-blue'>Skip and fill later</button>
            </div>
        </div>
    )
}

export default SetUpPopup