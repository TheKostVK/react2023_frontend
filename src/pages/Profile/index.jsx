import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Profile.module.scss";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";


export const Profile = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  const onClickLogout = () => {
    if (window.confirm("Вы хотите выйти из аккаунта?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.buttons} align="right">
      <Button onClick={() => onClickLogout()} variant="contained" color="error">Выйти</Button>
    </div>
  );
};
