"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../models/user.model");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
class Auth {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password } = req.body;
            if (email.trim() == "" || password.trim() == "") {
                return res.status(400).json({
                    success: true,
                    message: "Bad Request",
                });
            }
            let user = yield user_model_1.default.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: true,
                    errorMessage: "Not Found User!",
                    error: true,
                });
            }
            if (!(0, bcrypt_1.compareSync)(password, user.password)) {
                return res.json({
                    success: true,
                    errorMessage: "Password Is Wrong!",
                    error: true,
                });
            }
            let token = (0, jsonwebtoken_1.sign)({ email, sub: user._id }, process.env.SECRET_KEY, {
                expiresIn: "1w",
            });
            return res.status(200).json({
                success: true,
                token,
            });
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, email, password } = req.body;
            if (name.trim() == "" || email.trim() == "" || password.trim() == "") {
                return res.status(400).json({
                    success: true,
                    errorMessage: "Bad Request",
                    error: true,
                });
            }
            let user = yield user_model_1.default.findOne({ email });
            if (user) {
                return res.json({
                    success: true,
                    errorMessage: "There Is Already User With This Email",
                    error: true,
                });
            }
            let posts = [];
            let liked_posts = [];
            let newUser = yield user_model_1.default.create({
                name,
                email,
                password: (0, bcrypt_1.hashSync)(password, 8),
                posts,
                liked_posts,
            });
            try {
                yield newUser.save().then(() => {
                    return res.status(201).json({
                        success: true,
                        message: "User Saved Successfully in Db!",
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "There Is An Error While Saving The User",
                    error_message: error.message,
                    error: true,
                });
            }
        });
    }
    static me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.headers["authorization"];
            token = token.replace("Bearer", "").trim();
            let payload = (0, jsonwebtoken_1.verify)(token, process.env.SECRET_KEY);
            if (!payload) {
                return res.json({
                    success: true,
                    errorMessage: "Invalid Token!",
                    error: true,
                });
            }
            let user;
            if (typeof payload !== "string") {
                user = yield user_model_1.default.findById(payload.sub).select("-password -__v");
            }
            return res.status(200).json({
                user,
            });
        });
    }
}
exports.default = Auth;
