import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Вы хотите выйти из аккаунта?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Container maxWidth="lg">
          <div className={styles.inner}>
            <Link className={styles.logo} to="/">
              <div>react2023</div>
            </Link>
            <div className={styles.buttons}>
              {isAuth ? (
                <>
                  <Link to="/add-post">
                    <Button variant="contained">Написать статью</Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="contained">Профиль</Button>
                  </Link>
                </>
              ) : (
                <div>
                  <Link to="/Login">
                    <Button variant="outlined">Войти</Button>
                  </Link>
                  <Link to="/registration">
                    <Button variant="contained">Создать аккаунт</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
      <div style={{ backgroundСolor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", margin: 25 }}>
        <Breadcrumbs aria-label="breadcrumb" style={{ margin: 10 }}>
          <Link component={RouterLink} color="inherit" to="/">
            Home
          </Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

            return (
              <Link
                key={routeTo}
                component={RouterLink}
                color="inherit"
                to={routeTo}
              >
                {name}
              </Link>
            );
          })}
        </Breadcrumbs>
      </div>
    </>
  );
};
