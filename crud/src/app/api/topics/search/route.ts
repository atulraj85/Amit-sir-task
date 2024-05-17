import { connectMongoDB } from "../../../../libs/mongodb";
import { Topic } from "../../../../model/topic";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectMongoDB();
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search"); // Extract search query parameter
  const sort = searchParams.get("sort"); // Extract search query parameter

  let topics: any[];

  console.log(search);

  console.log(sort);

  if (search) {
    // If search parameter is provided, filter topics based on title or description
    topics = await Topic.find({
      $or: [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive search for title
        { description: { $regex: search, $options: "i" } }, // Case-insensitive search for description
      ],
    });
  } else {
    // If no search parameter provided, fetch all topics
    topics = await Topic.find();
  }

  if (sort) {
    switch (sort) {
      case "title":
        topics = await Topic.find().sort({ title: 1 });
      case "createdAt":
        topics = await Topic.find().sort({ createdAt: -1 });
    }
  }

  return NextResponse.json({ topics });
}
