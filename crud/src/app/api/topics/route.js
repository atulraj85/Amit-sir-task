import connectMongoDB from "@/libs/mongodb";
import Topic from "@/model/topic";
import { NextResponse } from "next/server";

// API Request to create
export async function POST(request) {
    const { title, description } = await request.json();
    // Connect to Database
    await connectMongoDB(); // Call connectMongoDB function
    // Create Topic
    await Topic.create({ title, description });
    // return next response
    return NextResponse.json({ message: "Topic created" }, { status: 201 });
}

// // GET Request
export async function GET() {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({topics});
}

// GET Request


// DELETE Request
export async function DELETE(request) {
    // Get search param for id
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({message:"Topic Deleted"}, {status:200});
}

export function print() {
    console.log("Hello");
}