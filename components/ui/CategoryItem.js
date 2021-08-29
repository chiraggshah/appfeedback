import cn from "classnames";

const CategoryItem = ({ label, count, selected, onClick }) => (
  <div
    className="flex flex-row justify-between py-3 px-4 cursor-pointer hover:bg-indigo-200"
    onClick={onClick}
  >
    <h4 className={cn({ "text-indigo-500": selected })}>{label}</h4>
    <div
      className={cn(
        "rounded-full px-3 text-sm self-center border",
        { "border-indigo-500 text-indigo-500 bg-indigo-100": selected },
        { "border-gray-300 bg-white text-gray-300": !selected }
      )}
    >
      {count}
    </div>
  </div>
);

export default CategoryItem;
