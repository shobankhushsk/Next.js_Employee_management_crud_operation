import connectMongoDB from "@/app/libs/mongodb";
import Topic from "@/app/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { newTitle, newDescription } = await request.json();

    await connectMongoDB();

    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title: newTitle, description: newDescription },
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

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });

  if (!topic) {
    return NextResponse.json({ message: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json({ topic }, { status: 200 });
}


// export async function DELETE(request, { params }) {
//   try {
//     await connectMongoDB();
//     await Topic.findByIdAndDelete(params.id);
//     return NextResponse.json({ message: "Topic deleted successfully." }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to delete topic", error: error.message }, { status: 500 });
//   }
// }

export async function DELETE(request) {
  const deletedTopic = request.nextUrl.searchParams.get("_id"); // ✅ fixed
  await connectMongoDB();
  await Topic.findByIdAndDelete(deletedTopic);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}