"use client";
import { withAuth } from '../../utils/withAuth';
import FooterDashboard from "../../components/FooterDashboard";
import NavDashboard from "../../components/NavDashboard";
import { useDataStore } from "@/store/useDataStore";
import { RE_API } from "@/config";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  myCourse
} from "@/services/authService";

function Scholarship() {

  return (
    <main className="min-h-screen bg-[#f6f4f8]">
      <section className="lg:ml-[255px] pt-[78px] px-4 md:px-6 pb-10">
        <div className="min-h-screen">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Scholarship Test
          </h2>


          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1">

          </div>



        </div>
      </section>

    </main>
  );
}

export default withAuth(Scholarship);