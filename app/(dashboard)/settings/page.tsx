"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { DataTable } from "@/components/custom-ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom-ui/Loader";
import { columns } from "@/components/settings/SettingsColumns";
import SettingsForm from "@/components/settings/SettingsForm";

const Settings = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [rates, setRates] = useState([]);

  const getRates = async () => {
    try {
      const res = await fetch("/api/settings", {
        method: "GET",
      });
      const data = await res.json();
      setRates(data);
      setLoading(false);
    } catch (err) {
      console.log("[rate_GET]", err);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <SettingsForm />
      <DataTable columns={columns} data={rates} searchKey="rate" />
    </div>
  );
};

export default Settings;
