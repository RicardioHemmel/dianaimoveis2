import { NextRequest, NextResponse } from "next/server";
import { getRelatedProperties } from "@/lib/services/properties/queries/singlePropertyPage/query.service";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const excludeId = searchParams.get("excludeId");
    const propertyStanding = searchParams.get("propertyStanding");

    if (!page || !limit || !excludeId || !propertyStanding) {
      return NextResponse.json(
        { error: "Search Params with no page or limit" },
        { status: 400 },
      );
    }

    const properties = await getRelatedProperties(Number(page), Number(limit), {
      excludeId: excludeId,
      propertyStanding: propertyStanding,
    });

    return NextResponse.json(properties, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
