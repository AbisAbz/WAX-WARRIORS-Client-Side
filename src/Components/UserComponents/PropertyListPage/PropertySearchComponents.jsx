import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import "../UserComponentCss/SearchComponent.css"
import PropertySortComponents from "./PropertySortComponents";

export default function PropertySearch() {

  return (
    <>
      <div className=" mx-auto  max-w-screen-2xl  grid grid-cols-1  md:grid-cols-1 px-3 items-center w-full h-[65px] rounded-md bg-[#fcfbfb] box-shadow mb-[2rem] md:my-4">
        <div className="w-full md:w-full">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onChange={(e) => {
              e.target.value.length !== 0
                ? setSearch(e.target.value)
                : setSearch(0);
            }}
          />
        </div>
      </div>
      <PropertySortComponents />
    </>
  );
}