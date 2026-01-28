import { NextRequest, NextResponse } from "next/server";
import { getAllProperties } from "@/lib/services/properties/queries/homePage/query.service";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    if (!page || !limit) {
      return NextResponse.json(
        { error: "Search Params with no page or limit" },
        { status: 400 },
      );
    }

    const properties = await getAllProperties(Number(page), Number(limit));

    return NextResponse.json(properties, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
