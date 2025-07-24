import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const SearchBar = ({ setIsSearchBarOpen, isSearchBarOpen, inputRef }) => {
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const hideSearchBar = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchBarOpen(false);
      }
    };
    document.addEventListener("mousedown", hideSearchBar);
    return () => document.removeEventListener("mousedown", hideSearchBar);
  }, []);

  const validateForm = () => {
    if (!search.trim()) return toast.error("Please enter a username");
    return true;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const isFormOkay = validateForm();
    if (isFormOkay === true) {
      window.open(search, "_blank");
    }
  };

  return (
    <div
      ref={searchRef}
      className={`fixed top-4 duration-300 w-[92vw] left-1/2 -translate-x-1/2 ${
        isSearchBarOpen ? "translate-y-0" : "-translate-y-[100vw]"
      }`}
    >
      <form onSubmit={handleSearch}>
        <div className="flex items-center justify-between relative bg-card rounded-full ps-6 pe-2 py-2 w-full border gap-2">
          <input
            ref={inputRef}
            type="text"
            className="border-none focus:outline-none text-sm flex-1"
            placeholder="Search by username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-primary text-primary-foreground content-center p-2.5 rounded-full inline-block cursor-pointer hover:opacity-80 duration-300">
            <Search />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
