import React from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import colors from "./colors";

const Container = styled("header")`
  background-color: ${colors.dark};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;

const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpyGlass = styled("span")`
  display: inline-block;
  animation: ${(props) => props.frequency}s ${Spin} linear infinite;
`;

class NavBar extends React.Component {
  state = { frequency: 10 };

  halfFrequency = () => {
    this.setState({ frequency: this.state.frequency / 2 });
  };

  render() {
    return (
      <Container>
        <NavLink to="/">Adopt Me!</NavLink>
        <NavLink to="/search-params">
          <SpyGlass
            onClick={this.halfFrequency}
            frequency={this.state.frequency}
          >
            <span aria-label="search" role="img">
              🔍
            </span>
          </SpyGlass>
        </NavLink>
      </Container>
    );
  }
}

export default NavBar;
