import CourseCard from "./elements/card";
import { useEffect, useState } from "react";
import { getCourses } from "@/services/authService";
import { useDataStore } from "@/store/useDataStore";
import header from "../../assets/images/header-pic/courses.jpg";
import TopHeader from "../../components/common/TopHeader";

export default function Courses() {

  const { setCourses, courses, searchCourses, setSearchCourses } = useDataStore((state) => state);
  const [data, setData] = useState(courses);

  const fetchData = async () => {

    const payload = {
      "maincatId": 1,
      "subCatId": 0,
      "isPaid": 2,
      "limit": 10,
      "page": 1
    }

    const res = await getCourses(payload);
    setData(res?.data || [])
    setCourses(res?.data || [])
  }

  useEffect(() => {
    if (!courses) fetchData()
    return () => {
      setSearchCourses(null)
    }
  }, [])

  return (data ? <>

    <TopHeader src={header} alt="Our Courses" title="Our Courses" subtitle="Connect with mentors who are already succeeding in your dream career." />

    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">

      {
        searchCourses ?
          <div className="grid max-w-6xl mx-auto grid  items-center mb-10 pb-10  border-b border-[#eaeaea]">
            <h1 className="text-[20px] font-semibold text-gray-800 mb-6">Showing Search Result </h1>
            <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <CourseCard key={searchCourses.id} data={searchCourses, { isPaid: 1, validity: 5, validityType: "days", bannerImage: searchCourses.thumbnailUrl, mrp: 5, sellPrice: 4, title_en: searchCourses.title }} />
            </div>
          </div>
          :
          null
      }

      <div className="grid max-w-6xl mx-auto  grid md:grid-cols-4 gap-5 items-center">
        {data?.records.map((item) => (
          <CourseCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  </> : null
  )
}