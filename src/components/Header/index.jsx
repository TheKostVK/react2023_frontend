import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import { greyTheme } from "../Theme";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link as RouterLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { ThemeProvider } from "@mui/material/styles";

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(state => state.auth.data);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onClickLogout = () => {
    if (window.confirm("Вы хотите выйти из аккаунта?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <>
      <ThemeProvider theme={greyTheme}>
        <AppBar position="static" color="header">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none"
                }}
              >
                <Link to="/" style={{ textDecoration: "none", outline: "none", color: "white" }}>
                  react
                </Link>
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" }
                  }}
                >
                  {/*<MenuItem key="testPage1" onClick={handleCloseNavMenu}>*/}
                  {/*  <Typography textAlign="center">testPage1</Typography>*/}
                  {/*</MenuItem>*/}
                  {/*<MenuItem key="testPage2" onClick={handleCloseNavMenu}>*/}
                  {/*  <Typography textAlign="center">testPage2</Typography>*/}
                  {/*</MenuItem>*/}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none"
                }}
              >
                <Link to="/" style={{ textDecoration: "none", outline: "none", color: "white" }}>
                  react
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {/*<Button*/}
                {/*  key="testPage1"*/}
                {/*  onClick={handleCloseNavMenu}*/}
                {/*  sx={{ my: 2, color: "white", display: "block" }}*/}
                {/*>*/}
                {/*  testPage1*/}
                {/*</Button>*/}
                {/*<Button*/}
                {/*  key="testPage2"*/}
                {/*  onClick={handleCloseNavMenu}*/}
                {/*  sx={{ my: 2, color: "white", display: "block" }}*/}
                {/*>*/}
                {/*  testPage2*/}
                {/*</Button>*/}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Меню пользователя">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userData && userData.avatarUrl ? (
                      <Avatar src={userData.avatarUrl} />
                    ) : (
                      <Avatar src="/broken-image.jpg" />
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {isAuth ? (
                    <>
                      <Link to="/profile" style={{ textDecoration: "none" }}>
                        <MenuItem key="profile" onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">Профиль</Typography>
                        </MenuItem>
                      </Link>
                      <Link onClick={() => onClickLogout()} style={{ textDecoration: "none" }}>
                        <MenuItem key="logout" onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">Выйти</Typography>
                        </MenuItem>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/login" style={{ textDecoration: "none" }}>
                        <MenuItem key="login" onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">Войти</Typography>
                        </MenuItem>
                      </Link>
                      <Link to="/registration" style={{ textDecoration: "none" }}>
                        <MenuItem key="registration" onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">Создать аккаунт</Typography>
                        </MenuItem>
                      </Link>
                    </>
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <div className="container py-5" style={{ maxWidth: 1178 }}>
          <div className="row">
            <div className="col">
              <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-3">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link component={RouterLink} color="inherit" to="/" style={{ textDecoration: "none" }}>
                      Главная
                    </Link>
                  </li>
                  {pathNames.map((name, index) => {
                    const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;

                    return (
                      <li className="breadcrumb-item">
                        <Link
                          key={routeTo}
                          component={RouterLink}
                          color="inherit"
                          to={routeTo}
                          style={{ textDecoration: "none" }}
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};
