import FooterDashboard from "../../components/FooterDashboard";
import NavDashboard from "../../components/NavDashboard";
import { useDataStore } from "@/store/useDataStore";
import { RE_API } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";

export default function myTest() {

  const { users, myTest, setMytest } = useDataStore((state) => state);
  const [data, setData] = useState(myTest);

  const getData = async () => {
    try {
      const mobile = users?.mobileNo;
      const updatePayload = {
        mobile: mobile
      }
      const response = await axios.post(`${RE_API}test-history`, updatePayload)
      const { data } = response.data;
      setMytest(data);
      setData(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  useEffect(() => {
    if (users?.mobileNo && !myTest) {
      getData();
    }
  }, [users?.mobileNo])


  return (
    <main className="min-h-screen bg-[#f7f5f8]">
      <section className="lg:ml-[255px] pt-[78px] px-4 md:px-6 pb-10">
        <div className="min-h-screen">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            My Test Reports
          </h2>


          {data ?
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item, index) => {
                const isCompleted = item.status == 1;

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition duration-300"
                  >
                    {/* Test Name */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {item.testName}
                    </h3>

                    {/* Status */}
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full mb-3 ${isCompleted
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {isCompleted ? "Completed" : "Pending"}
                    </span>

                    {/* Date */}
                    <p className="text-sm text-gray-500 mb-4">
                      {item.attendedAt
                        ? `Attended on: ${item.attendedAt}`
                        : "Not Attempted"}
                    </p>

                    {/* Button */}
                    <button
                      disabled={!isCompleted}
                      onClick={() => window.open(item.report, "_blank")}
                      className={`w-full py-2 rounded-lg text-white font-medium transition ${isCompleted
                          ? "primary-btn hover:bg-blue-700 cursor-pointer"
                          : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                      View Report
                    </button>
                  </div>
                );
              })}
            </div> : null}
        </div>
      </section>

    </main>
  );
}
