import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import LOGO from "../../assets/logos.png";
import { keyframes } from "@mui/system";

const pulse = keyframes`
0% {
  opacity: 0.8;
}
50% {
  opacity: 0.9;
  color: white;
}
100% {
  opacity: 0.8;
}
`;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:active": {
    animation: `${pulse} 0.5s ease-in-out`,
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const BlackBackgroundAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#FB7810", // Define o background como preto
  borderBottom: "solid 1px #333",
  boxShadow: "1px 1px 4px 2px #333",
}));

export default function Navbar() {
  return (
    <Box>
      <BlackBackgroundAppBar position="static">
        <Toolbar>
          <img
            src={LOGO}
            alt="Logo"
            style={{ maxWidth: "220px", marginLeft: "2%" }}
          ></img>
          <Box sx={{ flexGrow: 0.39 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 0.59 }} />
          <IconButton>
            <Link to="/login">
              <ExitToAppIcon style={{ color: "white" }}></ExitToAppIcon>
            </Link>
          </IconButton>
        </Toolbar>
      </BlackBackgroundAppBar>
    </Box>
  );
}
