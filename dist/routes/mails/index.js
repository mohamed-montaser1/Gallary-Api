"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mails_1 = require("../../controllers/mails");
const router = (0, express_1.Router)();
router.post("/send/:receiver", (req, res) => mails_1.default.send(req, res));
exports.default = router;
