import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import styles from "./FullPost.module.scss";
import { Post } from "../../components/Post";
import { AddComment } from "../../components/AddComment";
import { CommentsBlock } from "../../components/CommentsBlock";
import Button from "@mui/material/Button";
import ReactMarkdown from "react-markdown";
import { SideBlock } from "../../components/SideBlock";
import { fetchRemovePost } from "../../redux/slices/posts";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@mui/material/Divider";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const userData = useSelector(state => state.auth.data);
  const [isLoading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();


  React.useEffect(() => {
    axios.get(`/posts/${id}`).then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      alert("Ошибка при получении поста");
    });
  }, []);

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить статью?")) {
      dispatch(fetchRemovePost(id));
    }
  };

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? data.imageUrl : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <div className={styles.postText}>
          <ReactMarkdown children={data.text} />
        </div>
      </Post>

      {data.user._id === userData?._id && (
        <SideBlock title="Информация о посте">
          <Divider variant="inset" style={{ margin: 10 }} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300, maxWidth: 1100 }} size="small" aria-label="a dense table" align="center">
              <TableBody>
                <TableRow key="RowPostID" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    ID post
                  </TableCell>
                  <TableCell align="right">{data._id}</TableCell>
                </TableRow>
                <TableRow key="RowPostUserCreator" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                          style={{ backgroundColor: "slategrey" }}>
                  <TableCell component="th" scope="row">
                    Post user creator
                  </TableCell>
                  <TableCell align="right">{data.user.userName}</TableCell>
                </TableRow>
                <TableRow key="RowPostDateOfCreation" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    Post date of creation
                  </TableCell>
                  <TableCell align="right">{data.createdAt}</TableCell>
                </TableRow>
                <TableRow key="RowPostViewsCount" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                          style={{ backgroundColor: "slategrey" }}>
                  <TableCell component="th" scope="row">
                    Post views count
                  </TableCell>
                  <TableCell align="right">{data.viewsCount}</TableCell>
                </TableRow>
                <TableRow key="RowPostCommentsCount" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    Post comments count
                  </TableCell>
                  <TableCell align="right">{3}</TableCell>
                </TableRow>
                <TableRow key="RowPostTags" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                          style={{ backgroundColor: "slategrey" }}>
                  <TableCell component="th" scope="row">
                    Post tags
                  </TableCell>
                  <TableCell align="right">{data.tags}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Divider variant="inset" style={{ margin: 10 }} />
          <div className={styles.buttons} style={{ minHeight: 50 }} align="right">
            <Link to={`/posts/${id}/edit`}>
              <Button variant="contained">
                Редактировать пост
              </Button>
            </Link>
              <Button onClick={() => onClickRemove()} variant="contained" color="error">
                Удалить пост
              </Button>
          </div>
        </SideBlock>
      )}

      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg"
            },
            text: "Это тестовый комментарий 555555"
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg"
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top"
          }
        ]}
        isLoading={false}
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
};
