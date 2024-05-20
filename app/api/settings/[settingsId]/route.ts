import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import { connectToDB } from "@/lib/mongoDB";
import Settings from "@/lib/models/Settings";

export const GET = async (
  req: NextRequest,
  { params }: { params: { settingsId: string } }
) => {
  try {
    await connectToDB();

    const rate = await Settings.findById(params.settingsId);

    if (!rate) {
      return new NextResponse(JSON.stringify({ message: "rate not found" }), {
        status: 404,
      });
    }

    return NextResponse.json(rate, { status: 200 });
  } catch (err) {
    console.log("[settingsId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { settingsId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let settings = await Settings.findById(params.settingsId);

    if (!settings) {
      return new NextResponse("Rate not found", { status: 404 });
    }

    const { rate } = await req.json();

    if (!rate) {
      return new NextResponse("Rate is required", { status: 400 });
    }

    settings = await Settings.findByIdAndUpdate(
      params.settingsId,
      { rate },
      { new: true }
    );

    await settings.save();

    return NextResponse.json(settings, { status: 200 });
  } catch (err) {
    console.log("[settingsId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { settingsId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    await Settings.findByIdAndDelete(params.settingsId);

    return new NextResponse("Rate deleted", { status: 200 });
  } catch (err) {
    console.log("[settingsId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
