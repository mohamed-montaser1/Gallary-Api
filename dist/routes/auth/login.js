"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controllers/auth");
const router = (0, express_1.Router)();
router.post("/login", (req, res) => auth_1.default.login(req, res));
router.post("/register", (req, res) => auth_1.default.register(req, res));
router.get("/me", (req, res) => auth_1.default.me(req, res));
exports.default = router;
