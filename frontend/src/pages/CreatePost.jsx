import React, { useState } from "react";
import styled from "styled-components";
import GenerateImageForm from "../components/GenerateImageForm";
import GeneratedImageCard from "../components/GeneratedImageCard";

const Container = styled.div`
  height: 100%;
  overflow-y: none;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20px;

  @media (max-width: 1008px) {
  margin: 0 auto;
    max-width: 530px;
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 1200px;
  gap: 8%;
  display: flex;
  justify-content: center;

  @media (max-width: 1008px) {
    flex-direction: column;
  }
`;

const CreatePost = () => {
  const [imageLoading, setImageLoading] = useState(false);

  const [postLoading, setPostLoading] = useState(false);

  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  return (
    <Container>
      <Wrapper>
        <GenerateImageForm
          post={post}
          setPost={setPost}
          postLoading={postLoading}
          setPostLoading={setPostLoading}
          imageLoading={imageLoading}
          setImageLoading={setImageLoading}
        />
        <GeneratedImageCard src={post?.photo} loading={imageLoading} />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;
