import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Settings from "@/lib/models/Settings";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await connectToDB();

    const { rate } = await req.json();

    const existingRate = await Settings.findOne({ rate });

    if (existingRate) {
      return new NextResponse("Rate already exists", { status: 400 });
    }

    if (!rate) {
      return new NextResponse("Rate is required", { status: 400 });
    }

    const newRate = await Settings.create({
      rate,
    });

    await newRate.save();

    return NextResponse.json(newRate, { status: 200 });
  } catch (err) {
    console.log("[settings_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const rates = await Settings.find().sort({ createdAt: "desc" });

    return NextResponse.json(rates, { status: 200 });
  } catch (err) {
    console.log("[settings_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
