"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    image: String,
    title: String,
    description: String,
    likes: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "User",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Post", PostSchema);
