import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "../../components/Post";
import { fetchPosts } from "../../redux/slices/posts";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { selectIsAuth } from "../../redux/slices/auth";
import styles from "../FullPost/FullPost.module.scss";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts } = useSelector(state => state.posts);
  const isAuth = useSelector(selectIsAuth);

  const isPostsLoading = posts.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);


  return (
    <>
      {/*<Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">*/}
      {/*  <Tab label="Новые посты" />*/}
      {/*  <Tab label="Популярные посты" />*/}
      {/*</Tabs>*/}
      {isAuth && (
        <div className={styles.buttons} style={{ minHeight: 50 }} align="right">
          <Link to="/add-post" align="center">
            <Button variant="contained">Написать статью</Button>
          </Link>
        </div>
      )}
      {/*<div>*/}
      {/*  <TagsBlock items={tags.items} isLoading={isTagsLoading} />*/}
      {/*  <Index />*/}
      {/*</div>*/}
      <div>
        {(isPostsLoading ? [...Array(1)] : posts.items).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isLoading={isPostsLoading}
              isEditable={obj.user._id === userData?._id}
            />
          ))}
      </div>
    </>
  );
};
