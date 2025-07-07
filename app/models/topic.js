import mongoose, { Schema } from "mongoose";
import connectMongoDB from "@/app/libs/mongodb";

const topicSchema = new Schema(

 {
   title:String,
   description: String,

 },

 {
    timestamps:true,
 }

);

const Topic  = mongoose.models.Topic || mongoose.model("Topic",topicSchema);

export default Topic;