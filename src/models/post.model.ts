import { model, ObjectId, Schema, Types } from "mongoose";

interface postSchemaType {
  image: string;
  title: string;
  description: string;
  author: {
    type: ObjectId;
    ref: "User";
  };
  likes: [
    {
      type: ObjectId;
      ref: "User";
    }
  ];
}

const PostSchema = new Schema<postSchemaType>(
  {
    image: String,
    title: String,
    description: String,
    likes: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default model("Post", PostSchema);
