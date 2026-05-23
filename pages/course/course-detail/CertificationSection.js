import { BadgeCheck, Share2, Building2 } from "lucide-react";
import Image from "next/image";
import certificateImg from "../../../assets/images/certificate.jpeg";

export default function CertificationSection() {
  return (
    <section className="w-full bg-white-100 py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT IMAGE */}
        <div>
          <div className="bg-white p-3 rounded-3xl shadow-lg">
            <Image src={certificateImg} alt="certificate" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Earn Your Professional Certification
          </h2>

          <p className="text-gray-600 mt-4 max-w-md">
            Validate your expertise with a credential recognized by leading
            academic boards and industry professionals.
          </p>

          {/* POINTS */}
          <div className="mt-6 space-y-5">

            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full">
                <BadgeCheck size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Completion Certificate
                </h4>
                <p className="text-sm text-gray-600">
                  A verified digital credential unique to your achievement.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full">
                <Share2 size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Add to Portfolio
                </h4>
                <p className="text-sm text-gray-600">
                  Easy one-click integration with LinkedIn and professional CVs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full">
                <Building2 size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Industry Backed
                </h4>
                <p className="text-sm text-gray-600">
                  Curriculum reviewed by the International Board of Psychometrics.
                </p>
              </div>
            </div>

          </div>

          {/* BUTTON */}
          <button className="mt-8 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg transition-all">
            View Sample Certificate →
          </button>
        </div>

      </div>
    </section>
  );
}