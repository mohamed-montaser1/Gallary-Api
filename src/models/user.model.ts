import { model, ObjectId, Schema, Types } from "mongoose";

export type postsType =
  | [
      {
        type: ObjectId;
        ref: "Post";
      }
    ]
  | [];

interface userSchemaType {
  name: string;
  email: string;
  password: string;
  posts: postsType;
  liked_posts: postsType;
}

const UserSchema = new Schema<userSchemaType>(
  {
    name: String,
    email: String,
    password: String,
    posts: {
      type: [
        {
          type: Types.ObjectId,
          ref: "Post",
        },
      ],
      default: [],
    },
    liked_posts: {
      type: [
        {
          type: Types.ObjectId,
          ref: "Post",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default model("User", UserSchema);
