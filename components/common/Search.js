import { Button } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
import SearchGloabal from "./SearchGloabal";

const Search = ({heading, Badge, textSlide, placeholder, filterData, loading, isPopup})=> {

 const [searh,searhUpdate] = useState(null)

  return (
      <>
            <div className="inline-block px-4 py-2 bg-purple-100 uppercase text-purple-600 text-primary rounded-full text-xs font-bold">
                 {Badge}
             </div>
      
              <h1 className="mt-6 text-4xl md:text-6xl font-bold text-gray-800">
                 {heading}
              </h1>

             { textSlide ?
               <h1 className="text-4xl md:text-6xl font-bold gradient-text mt-3 mb-16">
                  <Typewriter
                    words={[
                      "born to lead.",
                      "born to innovate.",
                      "born to create.",
                      "born to inspire.",
                      "born to build."
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={40}
                    delaySpeed={2000}
              />
            </h1> : null }


          { isPopup ?          
            <SearchGloabal/>        
            :
          
            <div className="search-wrapper mt-10">
              <input
                onChange={(e)=>{ searhUpdate(e.target.value)}}
                type="text"
                placeholder={placeholder}
                className="search-input"
              />
               <Button onClick={()=>loading ? null : filterData(searh)} type="button" className={`${loading ? "cursor-not-allowed opacity-50 bg-gray-300" : "cursor-pointer"} search-btn`}>
                <FiSearch className="mr-2" /> Search
              </Button>
            </div>
          }
          
        </>  
    ) 
}

 export default Search;   