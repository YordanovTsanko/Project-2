import React from "react";
import styled from "styled-components";
import Button from "./button";
import { AddRounded, DarkMode, WbSunny } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { FormControlLabel, Switch } from "@mui/material";
import "./Navbar.css"


const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
  font-size: 22px;
  padding: 14px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;

const LogoTitle = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
`;

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const naviagate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");

  const handleThemeChange = (event) => {
    setIsDarkMode(event.target.checked);
  };

  return (
    <Container>
      <LogoTitle href="/">Yordanov AI</LogoTitle>
      <div style={{ display: "flex", alignItems: "center" }}>
        <FormControlLabel
          control={
            <Switch
              checked={isDarkMode}
              onChange={handleThemeChange}
              style={{color: "#fff"}}
              icon={
                <WbSunny
                  style={{ color: "#000", transform: "translate(-2.1px,-1.5px)" }}
                />
              }
              checkedIcon={
                <DarkMode style={{ transform: "translate(2.1px,-1.5px)" }} />
              }
            />
          }
        />
        {path[1] === "post" ? (
          <></>
        ) : (
          <Button
            onClick={() => naviagate("/post")}
            text="Generate Image"
            leftIcon={
              <AddRounded
                style={{
                  fontSize: "18px",
                }}
              />
            }
          />
        )}
      </div>
    </Container>
  );
};

export default Navbar;
