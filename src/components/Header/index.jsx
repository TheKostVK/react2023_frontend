import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
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
                  <Link to="/profile">
                    <Button variant="contained">Профиль</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/Login">
                    <Button variant="outlined">Войти</Button>
                  </Link>
                  <Link to="/registration">
                    <Button variant="contained">Создать аккаунт</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
      {/*<div>*/}
      {/*  <Breadcrumbs className={styles.buttons} aria-label="breadcrumb" style={{ margin: 10 }}>*/}
      {/*    <Link component={RouterLink} color="inherit" to="/">*/}
      {/*      Index*/}
      {/*    </Link>*/}
      {/*    {pathNames.map((name, index) => {*/}
      {/*      const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;*/}

      {/*      return (*/}
      {/*        <Link*/}
      {/*          key={routeTo}*/}
      {/*          component={RouterLink}*/}
      {/*          color="inherit"*/}
      {/*          to={routeTo}*/}
      {/*        >*/}
      {/*          {name}*/}
      {/*        </Link>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </Breadcrumbs>*/}
      {/*</div>*/}
    </>
  );
};
