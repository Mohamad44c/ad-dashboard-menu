"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loader from "@/components/custom-ui/Loader";
import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/products/ProductColumns";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="px-10 py-5">
        <DataTable columns={columns} data={products} searchKey="title" />
      </div>
    </div>
  );
}
