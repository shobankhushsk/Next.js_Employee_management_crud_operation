import connectMongoDB from "@/app/libs/mongodb"; // ✅ fixed typo
import Topic from "@/app/models/topic";
import { NextResponse } from "next/server"; // ✅ use NextResponse, not NextRequest

export async function POST(request) {
    const { title, description } = await request.json();
    await connectMongoDB();
    await Topic.create({ title, description });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 }); // ✅ fixed return method
}


export async function GET() {
    
    await connectMongoDB();
   const topics = await Topic.find();
   return NextResponse.json({topics});
}


export async function DELETE(request) {
  const deletedTopic = request.nextUrl.searchParams.get("_id"); // ✅ fixed
  await connectMongoDB();
  await Topic.findByIdAndDelete(deletedTopic);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}



export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { title, description } = await request.json();

    await connectMongoDB();

    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic updated successfully", updatedTopic }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to update topic", error: error.message }, { status: 500 });
  }
}


// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id"); // ✅ fixed here

//   if (!id) {
//     return NextResponse.json({ message: "Missing topic ID" }, { status: 400 });
//   }

//   await connectMongoDB();

//   const deletedTopic = await Topic.findByIdAndDelete(id);

//   if (!deletedTopic) {
//     return NextResponse.json({ message: "Topic not found" }, { status: 404 });
//   }

//   return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
// }