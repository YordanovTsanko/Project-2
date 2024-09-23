import express from "express";
import { generateImage,getGenerateImage } from "../controllers/GenerateImage.js";

const router = express.Router();

router.post("/", generateImage);
router.get("/:photoCode", getGenerateImage);

export default router;
