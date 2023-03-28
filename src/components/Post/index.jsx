import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { Link } from "react-router-dom";

import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { fetchRemovePost } from "../../redux/slices/posts";
import Button from "@mui/material/Button";

export const Post = ({
                       id,
                       title,
                       createdAt,
                       imageUrl,
                       user,
                       viewsCount,
                       commentsCount,
                       tags,
                       children,
                       isFullPost,
                       isLoading,
                       isEditable
                     }) => {
  const dispatch = useDispatch();
  const createdAtNew = new Date(createdAt);
  const formattedDate = `${createdAtNew.toLocaleDateString()} ${createdAtNew.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  if (isLoading) {
    return <PostSkeleton />;
  }


  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={formattedDate} />

        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
          {!isFullPost && (
            <div className={styles.buttons}>
              <Link to={`/posts/${id}/`}>
                <Button variant="contained">
                  Читать
                </Button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
