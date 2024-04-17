import categoriesIcons from "../assets/CategoriesIcons";

interface Props {
  category: string;
}

const CategoryItem = ({ category }: Props) => {
  const cat = categoriesIcons.find(c => c.name === category);
  const component = cat ? cat.component : null;

  return (
    <div className='flex flex-col items-center gap-2 text-center md:w-auto w-[125px]'>
      <div className='flex justify-center items-center h-20 w-20 md:h-32 md:w-32 border border-custom-dark rounded-full hover:bg-custom-bg-2'>
        {component}
      </div>
      {category}
    </div>
  );
};

export default CategoryItem;
