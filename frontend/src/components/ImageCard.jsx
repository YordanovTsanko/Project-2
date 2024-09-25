import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";
import FileSaver from "file-saver";

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px;
  box-shadow: 1px 2px 10px 1px ${({ theme }) => theme.black + 60};
  transition: all 0.3s ease;
  overflow: hidden;
  backface-visibility: hidden;
  &:hover {
    box-shadow: 1px 2px 10px 1px ${({ theme }) => theme.black + 80};
    scale: 1.05;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;
const HoverOverlay = styled.div`
  position: absolute;
  height: 100%;
  opacity: 0;
  top: -20px;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  cursor: default;
  align-items: start;
  gap: 5.5px;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.white};
  transition: opacity 0.3s ease;
  padding: 12px;

  ${Card}:hover & {
    opacity: 1;
  }
`;


const Author = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.white};
`;
const DownloadButton = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
`;

const ImageCard = ({ item }) => {
  const fileName = item?.photo?.split("/").pop() || "download.jpg";

  return (
    <Card>
      <LazyLoadImage alt={item?.prompt} width="100%" src={item?.photo} />
      <HoverOverlay>
        <Author style={{ fontSize: "15px" }}>
          <Avatar style={{ width: "24px", height: "24px", fontSize: "13px" }}>
            {item?.name?.slice(0, 1).toUpperCase()}
          </Avatar>
          {item?.name}
        </Author>
        <DownloadButton onClick={() => FileSaver.saveAs(item?.photo, fileName)}>
          <DownloadRounded /> Download
        </DownloadButton>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;
