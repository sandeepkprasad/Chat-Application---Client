import React, { useEffect } from "react";
import { useUserContext } from "../contexts/UserContext";

// Icons
import { MdPersonSearch } from "react-icons/md";
import { MdClose } from "react-icons/md";

const UserSearch = () => {
  const {
    searchQuery,
    setSearchQuery,
    setSearchResults,
    handleSearch,
    isSearchResults,
    setIsSearchResults,
  } = useUserContext();

  const handleCancelSearch = () => {
    setSearchResults([]);
    setSearchQuery("");
    setIsSearchResults(false);
  };

  // Debounce search on typing
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, handleSearch]);

  return (
    <div className="w-full h-fit bg-white flex justify-center items-center border-2 border-inputBorderColor rounded-md px-[2%]">
      <MdPersonSearch className="text-2xl text-gray-500" />
      <input
        type="text"
        name="searchQuery"
        placeholder="Search with username..."
        className="w-full h-10 px-[2%] outline-none font-inter text-textColor"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
      {isSearchResults && (
        <MdClose
          className="text-2xl text-gray-500 cursor-pointer"
          onClick={handleCancelSearch}
        />
      )}
    </div>
  );
};

export default UserSearch;
