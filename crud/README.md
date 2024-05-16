# Steps to perform CRUD Operation in MongoDB using NEXT JS

## Create a NEXT App & download all the dependencies:
- ```npx create-next-app@latest .``` To create Next App
- ```npm i mongoose``` To connect to DB
- ```npm i react-icons``` To get some icons

## Create & Style Components like Navbar and all the other pages.

## Backend Part
- Create a account in MongoDB Atlas
- Create new project
- Build a Database
    - Create Database User
    - Copy Username & pass and store them to {.env file}
    - Go to {MongoDB for VS Code}
    - Copy connection String and paste it to environment variables {.env} as MONGODB_URI = <-connectionString-> and reenter your password & add database name {crud_db} at last.
    
- ## Connect to DB
    - Create a libs folder -> mongodb.js -> 
    - code to connect to mongodb
    ```javascript
        import mongoose from "mongoose";

        const connectMongoDB = () => {
            try {
                mongoose.connect(process.env.MONGODB_URI);
                console.log("Connected to MongoDB");
            } catch (error) {
                console.log(error);
            }
        }
        export default connectMongoDB;
    ```

- ## Create a Model {structure of collections}
    - create a model folder -> create a file {topic.js}
    - code to create a schema.
```javascript
    import mongoose, {Schema} from "mongoose";

const topicSchema = new Schema(
    {
        title: String,
        description: String
    }, {
        timestamps: true,
    }
)

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema); //creates a new model named "Topic"

export default Topic;
```

- ## CRUD Operations:
    - create a folder {api} inside app folder -> crate new folder {topics} -> create {route.js}
    - code to create topics:
    - ```javascript
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

        // GET Request
        export async function GET() {
            await connectMongoDB();
            const topics = await Topic.find();
            return NextResponse.json({topics});
        }

        // DELETE Request
        export async function DELETE(request) {
            // Get search param for id
            const id = request.nextUrl.searchParams.get('id');
            await connectMongoDB();
            await Topic.findByIdAndDelete(id);
            return NextResponse.json({message:"Topic Deleted"}, {status:200});
        }
    ```
- For update create a dynamic route
- inside src/app/api/topics -> create a dynamic route/folder as {[id]} -> crate a file {route.js}
- Code inside it for update instruction
```javascript
    // Import necessary modules and dependencies
    import connectMongoDB from "@/libs/mongodb"; // Import MongoDB connection function
    import Topic from "@/model/topic"; // Import Topic model
    import { NextResponse } from "next/server"; // Import Next.js response module

    // Update API Call
    export async function PUT(request, {params}) { // Define a function to handle PUT requests
        const {id} = params; // Extract the id from the request parameters
        const {newTitle: title, newDescription: description} = await request.json(); // Extract newTitle and newDescription from the request body
        await connectMongoDB(); // Connect to MongoDB
        await Topic.findByIdAndUpdate(id, {title, description}); // Find the topic by id and update its title and description
        return NextResponse.json({message: "Topic Updated"}, {status:200}); // Return a JSON response indicating success
    }
```

- Get Topic by single id inside api/topics/[id]/route.js
```javascript
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
```

- ## Connection Backend to Frontwend
- Fetch topics to Components {create a function for that}
```javascript
    import React from 'react'
    import RemoveBtn from './atoms/RemoveBtn'
    import Link from 'next/link'
    import {HiPencilAlt} from "react-icons/hi";

    const getTopics = async () => {
        try {
            // Go to endpoint
            const res = await fetch('http://localhost:3000/api/topics', {cache: 'no-store'});
            if(!res.ok) {
                throw new Error("Failed to fetch data");
            }
            return res.json();

        } catch (error) {
            console.log("Error loding topics: " + error);
        }
    }

    const TopicsList = async () => {
        const {topics} = await getTopics();
    return (
        <>
            {topics.map((t) => (
                <div className='p-4 border border-slate-500 my-3 flex justify-between gap-5 items-start'>
                    <div>
                        <h2 className='font-bold text-2xl'>{t.title}</h2>
                        <div>{t.description}</div>
                    </div>

                    <div className='flex gap-2'>
                        <RemoveBtn />
                        <Link href={`/editTopic/${t._id}`}>
                            <HiPencilAlt size={24}/>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )
    }

    export default TopicsList
```
- See code of the project for the further things.