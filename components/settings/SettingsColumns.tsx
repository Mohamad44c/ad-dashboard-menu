"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Pencil } from "lucide-react";

export const columns: ColumnDef<SettingType>[] = [
  {
    accessorKey: "rate",
    header: "Rate",
    cell: ({ row }) => (
      <Link
        href={`/settings/${row.original._id}`}
        className="hover:text-blue-1"
      >
        {row.original.rate}
      </Link>
    ),
  },
  {
    id: "actions",
    header: "Edit",
    cell: ({ row }) => (
      <Link href={`/settings/${row.original._id}`}>
        <Pencil className="w-5 h-5 " />
      </Link>
    ),
  },
];
