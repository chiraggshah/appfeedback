import cn from "classnames";

const SortItem = ({ label, onClick, selected }) => (
  <div
    className="flex flex-row justify-between py-3 px-4 cursor-pointer hover:bg-indigo-200"
    onClick={onClick}
  >
    <h4 className={cn({ "text-indigo-500": selected })}>{label}</h4>
    <div
      className={cn(
        "flex border-2 rounded-full w-2 h-2 p-2 items-center justify-center",
        {
          "bg-indigo-100 border-indigo-500": selected,
          "border-gray-300 bg-white": !selected,
        }
      )}
    >
      {selected && <div className="bg-indigo-500 flex rounded-full p-1" />}
    </div>
  </div>
);

export default SortItem;
