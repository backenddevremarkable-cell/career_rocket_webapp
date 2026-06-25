import { Button } from "@headlessui/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
import SearchGloabal from "./SearchGloabal";
import { useRouter } from "next/router";

const Search = ({ heading, Badge, textSlide, placeholder, filterData, loading, isPopup }) => {
  const router = useRouter();
  const [searh, searhUpdate] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (router.isReady && router.query.search !== undefined) {
      searhUpdate(router.query.search || "");
    }
  }, [router.isReady, router.query.search]);

  // Keyboard shortcut listener to focus search when '/' or 'Ctrl+K' / 'Cmd+K' is pressed
  useEffect(() => {
    if (isPopup) return; // SearchGloabal handles it in popup mode
    const handleKeyDown = (e) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.isContentEditable)
      ) {
        return;
      }
      if (e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key === "k")) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPopup]);

  return (
    <>

      {Badge ?
        <div className="inline-block px-4 py-2 bg-purple-100 uppercase text-purple-600 text-primary rounded-full text-xs font-bold">
          {Badge}
        </div> : null}

      <h1 className="mt-6 text-4xl md:text-6xl font-bold text-gray-800">
        {heading}
      </h1>

      {textSlide ?
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
        </h1> : null}


      {isPopup ?
        <SearchGloabal />
        :

        <div className="search-wrapper mt-10 relative flex items-center">
          <div className="relative flex-1 flex items-center">
            <FiSearch className="absolute left-4 text-slate-400 text-lg pointer-events-none" />
            <input
              ref={inputRef}
              onChange={(e) => { searhUpdate(e.target.value) }}
              value={searh || ""}
              type="text"
              placeholder={placeholder}
              className="search-input !pl-11 !pr-4"
            />
          </div>

          <div className="flex items-center gap-2 pr-1.5 flex-shrink-0">
            {/* Keyboard shortcut hint */}

            {searh ? (
              <button
                onClick={() => {
                  searhUpdate("");
                  filterData("");
                }}
                className="h-9 w-9 cursor-pointer rounded-full hover:bg-gray-100 flex items-center justify-center transition flex-shrink-0"
              >
                <FiX className="text-lg text-gray-500" />
              </button>
            ) : null}

            <Button
              onClick={() => loading ? null : filterData(searh)}
              type="button"
              className={`${loading ? "cursor-not-allowed opacity-50 bg-gray-300" : "cursor-pointer"} search-btn !my-1.5 !mr-1.5 !ml-0`}
            >
              <FiSearch className="sm:mr-2 flex-shrink-0" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </div>
      }

    </>
  )
}

export default Search;