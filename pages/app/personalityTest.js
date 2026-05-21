import { 
  ArrowRight,
  Clock3,
  ShieldCheck,
  BadgeCheck,
  Zap,
  Brain,
  Heart,
  UserRound,
  Timer,
 } from "lucide-react";
import NavDashboard from "../../components/NavDashboard";
import FooterDashboard from "../../components/FooterDashboard";
import Link from "next/link";
import { useDataStore } from "@/store/useDataStore";
import { RE_API } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { MdQuiz } from "react-icons/md";

export default function personalityTest() {

    const { users, sraInfo, setSraInfo } = useDataStore((state) => state);
    const [info, setInfo] = useState(sraInfo);

      const getData = async () => { 
        try { 
         const mobile = users?.mobileNo;
         const updatePayload = {
             mobile: mobile
         }
         const response =  await axios.post(`${RE_API}sra-test-info`,updatePayload)
         const { data } = response.data;
          setSraInfo(data);
          setInfo(data);
        } catch (error) {
          console.log(error.response?.data || error.message);
        }
    }

    useEffect(() => {
         if(users?.mobileNo && !sraInfo){
            getData();
        }
    }, [users?.mobileNo])

  const features = [
    {
      title: "Motivation",
      desc: "Identify the intrinsic and extrinsic factors that drive your professional ambition.",
      icon: <Zap size={20} />,
    },
    {
      title: "Aptitude",
      desc: "Measure your cognitive strengths and natural ability to solve complex problems.",
      icon: <Brain size={20} />,
    },
    {
      title: "Interest",
      desc: "Discover the industries and activities that truly engage and excite you daily.",
      icon: <Heart size={20} />,
    },
    {
      title: "Personality",
      desc: "Understand your behavioral traits and how you interact within a team environment.",
      icon: <UserRound size={20} />,
    },
  ]

  return (
    <main className="min-h-screen bg-[#f7f5f8]">
      { info ?
        <section className="ml-[255px] pt-[78px]">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          {/* Left Side */}
          <div className="space-y-6 lg:col-span-8">
            {/* Banner Card */}
            <div className="overflow-hidden rounded-[12px] border border-gray-200 bg-white shadow-sm">
              <img
                src={info.image}
                alt={info.title}
                className="w-full object-cover"
              />

              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold leading-tight text-[#18233b]">
                  Identifying Your  {info.title} Starts Here
                </h3>

                <p className="mt-5 text-lg leading-9 text-slate-500">
                  { parse(info.description) }
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h3 className="text-2xl font-bold uppercase text-[#18233b]">
                HOW DOES IDEAL CAREER TEST WORK?
              </h3>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {features.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-100 bg-[#f8f9fc] p-5 transition hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fuchsia-100 text-fuchsia-700">
                        {item.icon}
                      </div>

                      <div>
                        <h4 className="text-2xl font-bold text-[#1f2937]">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-lg leading-8 text-slate-500">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="lg:col-span-4">
            <div className="sticky rounded-[12px] border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200/70">

              <h3 className="mt-5 text-2xl font-bold text-[#18233b]" style={{ textTransform : 'uppercase'}}>
                 {info.title}
              </h3>

              <p className="mt-3 text-lg leading-8 text-slate-500">
                A comprehensive evaluation designed for professionals seeking
                mid-career transitions or students planning their future.
              </p>

              <div className="mt-6 flex items-end gap-3">
                <span className="text-5xl font-bold text-[#18233b]">
                  ₹{info.fee_amount}
                </span>
               </div>

              <div className="mt-6 flex items-end gap-3">
                <span className="pb-2 text-lg text-slate-400" style={{display : 'inline-flex'}}>
                   <Timer size={20} style={{ position : 'relative', top : '4px'}} /> : {info.exam_duration} Minutes
                </span>

                <span className="pb-2 text-lg text-slate-400" style={{display : 'inline-flex'}}>
                   <MdQuiz size={20} style={{ position : 'relative', top : '4px'}} /> : {info.totalQuestions} Quiz
                </span>
              </div>  
            
              <Link href={'/attempt-test/sra'} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-700 to-purple-600 px-6 py-4 text-lg font-semibold text-white transition hover:opacity-95">
                Start Test <ArrowRight size={20} />
              </Link>

              <div className="my-6 border-t border-gray-100" />

              <div className="space-y-4">
                <InfoItem
                  icon={<Clock3 size={18} />}
                  text="Takes approximately 45 minutes"
                />
                <InfoItem
                  icon={<ShieldCheck size={18} />}
                  text="Validated by psychologists"
                />
                <InfoItem
                  icon={<BadgeCheck size={18} />}
                  text="24/7 Expert support"
                />
              </div>
            </div>
          </div>
        </div>
      </section> : null }
    </main>
  );
}

function InfoItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-[15px] text-slate-500">
      <div className="flex h-5 w-5 items-center justify-center rounded-full text-green-600">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );
}