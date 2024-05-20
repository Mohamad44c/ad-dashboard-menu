"use client";

import { useEffect, useState } from "react";

import Loader from "@/components/custom-ui/Loader";
import SettingsForm from "@/components/settings/SettingsForm";

const RateDetails = ({ params }: { params: { settingsId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [rateDetails, setRateDetails] = useState<SettingType | null>(null);

  const getRateDetails = async () => {
    try {
      const res = await fetch(`/api/settings/${params.settingsId}`, {
        method: "GET",
      });
      const data = await res.json();
      setRateDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[rateId_GET]", err);
    }
  };

  useEffect(() => {
    getRateDetails();
  }, []);

  return loading ? <Loader /> : <SettingsForm initialData={rateDetails} />;
};

export default RateDetails;
