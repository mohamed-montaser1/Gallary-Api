"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
    posts: {
        type: [
            {
                type: mongoose_1.Types.ObjectId,
                ref: "Post",
            },
        ],
        default: [],
    },
    liked_posts: {
        type: [
            {
                type: mongoose_1.Types.ObjectId,
                ref: "Post",
            },
        ],
        default: [],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", UserSchema);
