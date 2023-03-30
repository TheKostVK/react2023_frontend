import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistration, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import axios from "../../axios";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const inputFileRef = React.useRef(null);

  const onSubmit = async () => {
    try {
      const fields = {
        userName,
        email,
        password,
        avatarUrl
      };

      const data = await dispatch(fetchRegistration(fields));

      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      } else {
        setEmail("");
        setUserName("");
        setPassword("");
        setAvatarUrl("");
        alert("Не удалось зарегистрироваться");
      }

    } catch (err) {
      setEmail("");
      setUserName("");
      setPassword("");
      setAvatarUrl("");
      alert("Ошибка регистрации");
      console.warn("Ошибка регистрации");
    }
  };


  if (isAuth) {
    return <Navigate to={"/"} />;
  }

  const handleChangeFile = async (event) => {
    try {
      const savePath = "users/avatar/";
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      formData.append("savePath", savePath); // добавляем путь сохранения в форму
      const { data } = await axios.post("/upload", formData);
      setAvatarUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("Ошибка загрузки превью");
    }
  };

  const onClickRemoveImage = () => {
    setAvatarUrl("");
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <img style={{ width: 100, height: 100 }} className={styles.avatar} src={avatarUrl || "/noavatar.png"}
             alt="Аватар" />
      </div>
      <div className={styles.avatar}>
        {avatarUrl ? (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="small">
              Загрузить аватар
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
          </>
        )}
      </div>
      <TextField
        className={styles.field}
        label="E-Mail"
        error=""
        helperText=""
        onChange={e => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        className={styles.field}
        label="Имя пользователя"
        error=""
        helperText=""
        onChange={e => setUserName(e.target.value)}
        fullWidth
      />
      <TextField className={styles.field}
                 label="Пароль"
                 type="password"
                 error=""
                 helperText=""
                 onChange={e => setPassword(e.target.value)}
                 fullWidth />
      <Button onClick={onSubmit} type="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
    </Paper>
  );
};
