import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className="container py-5" style={{maxWidth: 1178}}>
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-3">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link component={RouterLink} color="inherit" to="/" style={{textDecoration: "none"}}>
                    Home
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
                      style={{textDecoration: "none"}}
                    >
                      {name}
                    </Link>
                    </li>
                  );
                })}
                {/*<li className="breadcrumb-item"><a href="#">User</a></li>*/}
                {/*<li className="breadcrumb-item active" aria-current="page">User Profile</li>*/}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
