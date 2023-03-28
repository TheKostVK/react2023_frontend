import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "../../axios";

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const inputFileRef = React.useRef(null);
  const uniqueId = Math.random().toString(36).substr(2, 9);

  const isEditing = Boolean(id);


  const handleChangeFile = async (event) => {
    try {
      const savePath = "posts/preview/"
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      formData.append("savePath", savePath); // добавляем путь сохранения в форму
      const { data } = await axios.post("/upload", formData);
      console.log(data);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("Ошибка загрузки превью");
    }
  };



  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        text,
        tags: tags.split(",")
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const _id = isEditing
        ? id
        : data._id;

      navigate(`/posts/${_id}`);

    } catch (err) {
      alert("Ошибка при создании статьи");
      console.warn("Ошибка при создании статьи");
    }
  };

  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setTags(data.tags.join(","));
        setImageUrl(data.imageUrl);
      }).catch(err => {
        console.warn(err);
        alert("Ошибка получения статьи для редактирования");
      });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      uniqueId: uniqueId
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      {imageUrl ? (
        <>
          <img className={styles.image} src={imageUrl} alt="Uploaded" />
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить превью
          </Button>
        </>
      ) : (
        <>
          <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
            Загрузить превью
          </Button>
          <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }}
                 value={tags}
                 onChange={e => setTags(e.target.value)}
                 variant="standard"
                 placeholder="Тэги"
                 fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
