import { FiSearch } from "react-icons/fi";

const Search = ()=> {
  return (
      <div className="search-wrapper mt-10">
            <input
              type="text"
              placeholder="Search for careers, skills, or industries..."
              className="search-input"
            />
            <button className="search-btn">
              <FiSearch className="mr-2" /> Search
            </button>
          </div>) 
    }

 export default Search;   