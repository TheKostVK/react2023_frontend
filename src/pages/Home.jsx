import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts, tags } = useSelector(state => state.posts);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);


  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые посты" />
        <Tab label="Популярные посты" />
      </Tabs>
      {/*<div>*/}
      {/*  <TagsBlock items={tags.items} isLoading={isTagsLoading} />*/}
      {/*  <CommentsBlock />*/}
      {/*</div>*/}
      <div>
        {(isPostsLoading ? [...Array(2)] : posts.items).map((obj, index) =>
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
