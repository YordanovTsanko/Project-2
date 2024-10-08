import React from "react";
import styled from "styled-components";
import Button from "./button";
import TextInput from "./TextInput";
import { AddToQueue, AutoAwesome, CreateRounded } from "@mui/icons-material";
import axios from "axios";

const Form = styled.form`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  margin-top: 15px;
`;

const GenerateImageForm = ({
  post,
  setPost,
  postLoading,
  setPostLoading,
  imageLoading,
  setImageLoading,
}) => {
  const handleError = (error) => {
    console.log(error);
    if (error.response) {
      console.error(error.response);
      alert(error.response.data.error);
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
  };

  const generateImage = async () => {
    let photoCode = "";
    setImageLoading(true);
    setPost({
      ...post,
      photo: "",
    });

    try {
      const res = await axios.post("/api/generateImage", {
        prompt: post.prompt,
      });

      if (res?.data?.photoCode) {
        photoCode = res.data.photoCode;
        try {
          const imageResponse = await axios.get(
            `/api/generateImage/${res.data.photoCode}`
          );

          if (
            imageResponse.data.status === "IN_PROGRESS" ||
            imageResponse.data.status === "IN_QUEUE"
          ) {
            await new Promise((resolve) => setTimeout(resolve, 30000));
            await fetchImageStatus(photoCode);
          }

          if (imageResponse.data.status === "FAILED") {
            console.log(imageResponse.data.error);
            throw new Error(imageResponse.data.error);
          }
          if (imageResponse.data.photo) {
            console.log("Image generation completed:", imageResponse.data);
            setImageLoading(false);
            setPost({
              ...post,
              photo: imageResponse.data.photo,
            });
          }
        } catch (error) {
          handleError(error);
        }
      } else {
        throw new Error("No photo code received");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setImageLoading(false);
    }
  };

  const fetchImageStatus = async (code) => {
    setImageLoading(true);
    if (!code) {
      alert("No photo code available to fetch the image.");
      return;
    }

    try {
      const imageResponse = await axios.get(`/api/generateImage/${code}`);

      console.log(imageResponse.data);
      if (
        imageResponse.data.status === "IN_PROGRESS" ||
        imageResponse.data.status === "IN_QUEUE"
      ) {
        await new Promise((resolve) => setTimeout(resolve, 30000));
        await fetchImageStatus(code);
      }

      if (imageResponse.data.status === "FAILED") {
        console.log(imageResponse.data.error);
        throw new Error(imageResponse.data.error);
      }
      if (imageResponse.data.photo) {
        setImageLoading(false);
        setPost({
          ...post,
          photo: imageResponse.data.photo,
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const createPostFun = async () => {
    setPostLoading(true);
    try {
      console.log(post)
      const res = await axios.post("/api/post", {
        post,
      });

      console.log(res.data)
      setPostLoading(false);
      alert("Image posted succesfully");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>
          Write your prompt according to the image you want to generate!
        </Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name . . ."
          name="name"
          value={post.name}
          handleChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image . . ."
          name="name"
          rows="8"
          isDisabled={post.photo !== ""}
          textArea
          value={post.prompt}
          handleChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        ** You can post the AI Generated Image to the Community **
      </Body>
      <Actions>
        {post.photo !== "" && (
          <Button
            text="New Photo"
            leftIcon={<AddToQueue />}
            type="secondary"
          isLoading={postLoading}
            onClick={() => {
              setPost({
                name: "",
                prompt: "",
                photo: "",
              });
            }}
          />
        )}

        <Button
          text="Generate Image"
          leftIcon={<AutoAwesome />}
          isLoading={imageLoading || postLoading}
          isDisabled={post.name === "" || post.prompt === ""}
          onClick={async () => {
            await generateImage();
          }}
        />
        <Button
          text="Post Image"
          type="green"
          leftIcon={<CreateRounded />}
          isLoading={postLoading}
          isDisabled={
            post.name === "" || post.prompt === "" || post.photo === ""
          }
          onClick={async () => createPostFun()}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
