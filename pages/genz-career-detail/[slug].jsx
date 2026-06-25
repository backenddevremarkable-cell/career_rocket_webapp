import { useEffect, useState } from "react";
import CareerNavigator from "./components/CareerNavigator";
import HeroSection from "./components/HeroSection";
import LearningSection from "./components/LearningSection";
import OpportunitySection from "./components/OpportunitiesSection";
import WhoShouldPursue from "./components/WhoShouldPursue";
import { BASE_URL } from "@/config";
import Link from "next/link";
import { useDataStore } from "@/store/useDataStore";
import { saveToStorage, getSlug } from "@/utils/index";
import {
  careerBycatIdGenZ
} from "@/services/publicService";
import { getFromStorage } from "@/utils/index";
import LoadingScreen from "../../components/common/Loading";

export default function Page() {

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [data, SetData] = useState();
  const [loading, setLoading] = useState(false);
  const { zcourseId } = useDataStore((state) => state);

  const fetchData = async () => {
    try {
      const payload = {
        id: zcourseId || getFromStorage('zcsid')
      }
      setLoading(true);
      const res = await careerBycatIdGenZ(payload);
      SetData(res?.data || {});
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!data) fetchData();
  }, []);

  return (
    loading ?
      <div className="relative min-h-[500px]">
        <LoadingScreen />
      </div>
      :
      data ?
        <main>
          <HeroSection {...data} />
          <WhoShouldPursue {...data} />
          <LearningSection {...data} />
          <CareerNavigator {...data} />
          <OpportunitySection {...data} />
        </main> : null
  );
}