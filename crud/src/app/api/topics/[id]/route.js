import connectMongoDB from "@/libs/mongodb";
import Topic from "@/model/topic";
import { NextResponse } from "next/server";

// Update API Call
export async function PUT(request, {params}) { // Define a function to handle PUT requests
    const {id} = params; // Extract the id from the request parameters
    const {newTitle: title, newDescription: description} = await request.json(); // Extract newTitle and newDescription from the request body
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, {title, description});
    return NextResponse.json({message: "Topic Updated"}, {status:200});
}

export async function GET(request, {params}) {
    const {id} = params;
    await connectMongoDB;
    const topic = await Topic.findOne({_id: id});
    return NextResponse.json({topic}, {status: 200});
}
