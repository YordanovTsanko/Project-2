import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchBar } from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import axios from "axios";
import { CircularProgress, LinearProgress } from "@mui/material";

const Container = styled.div`
  height: 100%;
  overflow-y: none;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const Span = styled.span`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Wrapper = styled.div`
width: 100%;
max-width: 1400px;
padding: 32px 0px;
display flex;
justify-content: center;`;

const CardWrapper = styled.div`
  padding: 15px 20px;
  overflow: hidden;
  display: grid;
  gap: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    const imageResponse = await axios.get(`/api/post`);
    setPosts(imageResponse.data.data);
    setPostsLoading(false)
  };

  const filteredPosts = posts.filter((item) =>
    item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container>
      <Headline>
        Explore popluar posts in the Community! <Span>Generated with AI</Span>
      </Headline>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Wrapper>
        {postsLoading ? (
          <>
            <CircularProgress size="2.5rem" color="secondary" />
            <h3 style={{fontWeight: "500"}}>Loading . . .</h3>
          </>
        ) : (
          <CardWrapper>
            {filteredPosts.length > 0 &&
              filteredPosts.map((item, index) => (
                <ImageCard key={index} item={item} />
              ))}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
