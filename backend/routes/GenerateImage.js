import express from "express";
import { generateImage,getGenerateImage } from "../controllers/GenerateImage.js";

const router = express.Router();

router.post("/", generateImage);
router.get("/", getGenerateImage);

export default router;
