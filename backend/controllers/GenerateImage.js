import * as dotenv from "dotenv";
import { createError } from "../errors.js";
import axios from "axios";

dotenv.config();

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    const options = {
      method: "POST",
      url: "https://api.monsterapi.ai/v1/generate/txt2img",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          `Bearer ${process.env.MONSTER_API_KEY}`,
      },
      data: {
        safe_filter: true,
        prompt: prompt,
        steps: 200,
        style: "enhance",
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
