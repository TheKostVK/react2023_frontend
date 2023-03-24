import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistration, selectIsAuth } from "../../redux/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const imageUrl = "";
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const inputFileRef = React.useRef(null);

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: ""
    }
  });


  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegistration(values));

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    } else {
      alert("Не удалось зарегистрироваться");
    }
  };

  const handleChangeFile = () => {

  };

  const onClickRemoveImage = () => {

  };

  if (isAuth) {
    return <Navigate to={"/"} />;
  }
  ;

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <div className={styles.avatar}>
        <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="small">
          Загрузить аватар
        </Button>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {imageUrl && (
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
        )}
        {imageUrl && (
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Имя пользователя"
          error={Boolean(errors.userName?.message)}
          helperText={errors.userName?.message}
          {...register("userName", { required: "Укажите имя пользователя" })}
          fullWidth
        />
        <TextField className={styles.field}
                   label="Пароль"
                   type="password"
                   error={Boolean(errors.password?.message)}
                   helperText={errors.password?.message}
                   {...register("password", { required: "Укажите пароль" })}
                   fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
