import Header from "../../../assets/images/header-pic/career.svg";
import Image from "next/image";
import Search from "../../../components/common/Search";
import { useEffect, useState } from "react";
import {
  careerCategory
} from "@/services/authService";
import Link from "next/link";
import { useDataStore } from "@/store/useDataStore";
import { saveToStorage } from "@/utils/index";
import NoRecordFound from "../../../components/common/NoRecordFound";
import SkeletonCareerLib from "../../../components/home/skeleton/SkeletonCareerLib";
import Card from "./components/card";
import { useRouter } from "next/router";

const CareerLibrary = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const { setCaree, setCareerList, careerList, searchCareer, setSearchCareer } = useDataStore();
  const [data, setdata] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (searchVal = "") => {
    try {
      setLoading(true);
      const res = await careerCategory({ page, limit, search: searchVal });
      console.log("Career Category Response:", res);
      setdata(res?.data || {});
      if (!searchVal) {
        setCareerList(res?.data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;

    const querySearch = router.query.search || "";
    if (querySearch) {
      fetchData(querySearch);
    } else if (careerList) {
      setdata(careerList);
      setLoading(false);
    } else {
      fetchData("");
    }

    return () => {
      setSearchCareer(null);
    };

  }, [router.isReady, router.query.search]);

  const filterData = (e) => {
    const nextQuery = { ...router.query };
    if (e) {
      nextQuery.search = e;
    } else {
      delete nextQuery.search;
    }
    router.push({
      pathname: router.pathname,
      query: nextQuery,
    }, undefined, { shallow: true });
    fetchData(e || "");
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50/50 pb-24">
        <div className="mx-auto">

          <div className="relative overflow-hidden border-b border-slate-200/50 bg-gradient-to-b from-[#fbfbfd] to-white px-6 py-20 md:py-24 md:px-14">
            {/* Dot Grid Background Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#9d2ba803_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {/* Background Blur Blobs */}
            <div className="absolute left-[-80px] top-[-80px] h-[240px] w-[240px] rounded-full bg-purple-55/10 blur-3xl"></div>
            <div className="absolute bottom-[-100px] right-[-100px] h-[260px] w-[260px] rounded-full bg-pink-55/10 blur-3xl"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <Search
                loading={loading}
                filterData={(e) => filterData(e)}
                placeholder="Search from 200+ careers to match your passion..."
                Badge="Choose your career goal"
                heading={
                  <div className="mb-8">
                    What’s your{" "}
                    <span className="bg-gradient-to-r from-purple-700 to-[#A02BAA] bg-clip-text text-transparent">
                      dream career?
                    </span>
                  </div>
                }
              />
            </div>
          </div>

          {/* CARD SECTION */}
          {loading || (data && data?.records.length) ? (
            <section className="max-w-6xl mx-auto px-4 mt-16">

              {searchCareer ? (
                <div className="max-w-6xl mx-auto mb-10 pb-10 border-b border-slate-200/60">
                  <h1 className="text-[20px] font-bold text-gray-900 tracking-tight mb-6">
                    Search Result
                  </h1>
                  <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <Card key={searchCareer?.id} {...searchCareer} />
                  </div>

                  <h1 className="text-[20px] font-bold text-gray-900 tracking-tight mt-12">
                    Explore More Careers
                  </h1>
                </div>
              ) : null}

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                {loading ? (
                  Array.from({ length: 8 }).map((_, idx) => (
                    <SkeletonCareerLib key={idx} />
                  ))
                ) : (
                  data?.records.map((item, index) => (
                    <Card key={index} {...item} />
                  ))
                )}
              </div>
            </section>
          ) : (
            <NoRecordFound />
          )}
        </div>
      </div>
    </>
  );
}

export default CareerLibrary;