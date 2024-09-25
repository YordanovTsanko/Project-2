import * as dotenv from "dotenv";
import { createError } from "../errors.js";
import axios from "axios";

dotenv.config();

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // const options = {
    //   method: "POST",
    //   url: "https://api.monsterapi.ai/v1/generate/txt2img",
    //   headers: {
    //     accept: "application/json",
    //     "content-type": "application/json",
    //     authorization: `Bearer ${process.env.MONSTER_API_KEY}`,
    //   },
    //   data: {
    //     safe_filter: true,
    //     prompt: prompt,
    //     steps: 500,
    //     style: "photorealistic",
    //     negprompt:
    // "blurry, low quality, pixelated, grainy, out of focus, distorted, glitches, artifacts, unnatural shapes, unnatural proportions, incorrect anatomy, oversaturated, dull, washed out, unnatural colors, harsh lighting, bad shadows, underexposed, overexposed, bad anatomy, deformed, extra limbs, missing limbs, duplicate limbs, strange hands, disfigured face, asymmetrical face, bad perspective, bad depth, cropped, messy background, duplicate face, extra face, distorted facial features, strange expressions, unrealistic expressions, flat shading, cartoonish style, unrealistic textures, overly bright highlights, excessive filters, watermark, text, logo, unintended reflections, clutter, unintentional artifacts",
    //   },
    // };

    const options = {
      method: "POST",
      url: "https://api.monsterapi.ai/v1/generate/sdxl-base",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.MONSTER_API_KEY}`,
      },
      data: {
        enhance: true,
        optimize: false,
        safe_filter: false,
        steps: 500,
        style: "photorealistic",
        samples: 1,
        negprompt:
          "blurry, low quality, pixelated, grainy, out of focus, distorted, glitches, artifacts, unnatural shapes, unnatural proportions, incorrect anatomy, oversaturated, dull, washed out, unnatural colors, harsh lighting, bad shadows, underexposed, overexposed, bad anatomy, deformed, extra limbs, missing limbs, duplicate limbs, strange hands, disfigured face, asymmetrical face, bad perspective, bad depth, cropped, messy background, duplicate face, extra face, distorted facial features, strange expressions, unrealistic expressions, flat shading, cartoonish style, unrealistic textures, overly bright highlights, excessive filters, watermark, text, logo, unintended reflections, clutter, unintentional artifacts, distorted text, incorrect spelling, unclear letters, low contrast, incomplete text",
        prompt: prompt,
      },
    };

    const response = await axios.request(options);

    return res.status(200).json({ photoCode: response.data.process_id });
  } catch (error) {
    next(
      createError(
        error.response?.data?.error?.message ||
          error?.message ||
          "An error occurred"
      )
    );
    console.log(error);
  }
};

export const getGenerateImage = async (req, res, next) => {
  try {
    const { photoCode } = req.params;

    const options = {
      method: "GET",
      url: `https://api.monsterapi.ai/v1/status/${photoCode}`,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.MONSTER_API_KEY}`,
      },
    };
    const response = await axios.request(options);

    console.log(response.data);
    if (response.data.status === "FAILED") {
      return res.status(400).json({
        error: response.data.result.errorMessage,
        process_id: response.data.process_id,
      });
    }
    if (response.data.status === "COMPLETED") {
      return res
        .status(200)
        .json({ photo: response?.data?.result?.output.toString() });
    }
    if (
      response.data.status === "IN_PROGRESS" ||
      response.data.status === "IN_QUEUE"
    ) {
      return res.status(200).json(response.data);
    }
  } catch (error) {
    console.error(error);
    next(
      createError(
        error.response?.data?.error?.message ||
          error?.message ||
          "An error occurred"
      )
    );
  }
};
