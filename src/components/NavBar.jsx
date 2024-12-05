import React from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  position: fixed;
  padding-top: 10px;
  background-color: var(--green);
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 20px;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Button = styled.button`
  background-color: black;
  color: var(--green);
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 4px;
`;

function NavBar({ user, onLoginClick, onLogoutClick }) {
  return (
    <StyledNavBar>
      <Logo />
      <ActionsContainer>
        <NavLinks />
        {user ? (
          <Button onClick={onLogoutClick}>Logout</Button>
        ) : (
          <Button onClick={onLoginClick}>Login</Button>
        )}
      </ActionsContainer>
    </StyledNavBar>
  );
}

export default NavBar;