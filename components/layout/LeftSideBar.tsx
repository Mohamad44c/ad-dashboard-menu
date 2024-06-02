"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-nexus-blue shadow-xl max-lg:hidden">
      <Image
        src="https://utfs.io/f/f40d55f3-fb8e-483a-81a4-0cd432e0b739-1zbfv.png"
        alt="Nexus"
        priority={true}
        width={150}
        height={70}
      />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium items-center ${
              pathname === link.url ? "text-blue-1" : "text-white"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <UserButton />
        <p className="text-white">Edit Profile</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
