import categoriesIcons from "../assets/CategoriesIcons";

interface Props {
  category: string;
  handleCategory: (category: string) => void;
}

const CategoryItem = ({ category, handleCategory }: Props) => {
  const cat = categoriesIcons.find(c => c.name === category);
  const component = cat ? cat.component : null;

  return (
    <button onClick={() => handleCategory(category)} className='flex flex-col items-center gap-2 text-center md:w-auto w-[125px]'>
      <div className='flex justify-center items-center h-20 w-20 md:h-32 md:w-32 border border-custom-dark rounded-full hover:bg-custom-white'>
        {component}
      </div>
      {category}
    </button>
  );
};

export default CategoryItem;
