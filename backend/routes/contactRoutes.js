import express from "express";
import { submitContact, getAllMessages } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", getAllMessages); 

export default router;
