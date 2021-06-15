export default function Feedback() {
  return (
    <div className="grid grid-cols-8 gap-4">
      <div />
      <div className="col-span-2 text-2xl">All Feedbacks</div>

      <div className="flex flex-row col-span-4 justify-end items-center space-x-4">
        <input placeholder="Search" className="border rounded-md p-2" />
        <div className="border rounded-md p-2 bg-indigo-600 text-white cursor-pointer">
          Add Feedback
        </div>
      </div>
      <div />

      <div />
      <div className="col-span-2">
        <div className="border rounded-md bg-white shadow-sm my-4">
          <div className="flex flex-row justify-between p-4 border-b items-center">
            <div>Category</div>
            <div className="border rounded-md px-3 py-1 text-xs cursor-pointer">
              Add
            </div>
          </div>
          <div className="p-4">
            <CategoryItem label="All" count="0" />
            <CategoryItem label="General ✋🏻" count="0" />
            <CategoryItem label="Features ❤️" count="0" />
            <CategoryItem label="Integrations 🤩" count="0" />
          </div>
        </div>
        <div className="border rounded-md bg-white shadow-sm my-6">
          <div className="flex flex-row justify-between p-4 border-b">
            Filter
          </div>
          <div className="p-4">
            <FilterItem label="Sort By" filterBy="Top" />
            <FilterItem label="Status" filterBy="All" />
            <FilterItem label="Tags" filterBy="All" />
          </div>
        </div>
      </div>
      <div className="col-span-4 border rounded-md bg-white shadow-sm my-4"></div>
      <div />
    </div>
  );
}

const CategoryItem = ({ label, count }) => (
  <div className="flex flex-row justify-between py-3">
    <h4 className="">{label}</h4>
    <div className="rounded-full px-3 bg-indigo-100 text-sm text-indigo-500 self-center border border-indigo-500">
      {count}
    </div>
  </div>
);

const FilterItem = ({ label, filterBy }) => (
  <div className="flex flex-row justify-between py-3">
    <h4 className="">{label}</h4>
    <div className="">{filterBy}</div>
  </div>
);
