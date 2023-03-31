import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Profile.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Post } from "../../components/Post";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import {fetchUserPosts} from "../../redux/slices/posts";


export const Profile = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userPosts  = useSelector((state) => state.userPosts);
  const userData = useSelector(state => state.auth.data);

  const isPostsLoading = userPosts && (userPosts.status === "loading" || true);

  // React.useEffect(() => {
  //   if (userData && userData._id) {
  //     dispatch(fetchUserPosts(userData._id));
  //   }
  // }, [userData]);


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
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center" style={{justifyContent: "center"}}>
                  {userData.avatarUrl ? (
                    <>
                      <Avatar
                        className="rounded-circle img-fluid"
                        src={userData.avatarUrl}
                        alt="avatar"
                        style={{
                          width: "150px",
                          height: "150px",
                          margin: "auto",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}  />
                    </>
                  ) : (
                    <>
                      <Avatar
                        className="rounded-circle img-fluid"
                        src="/broken-image.jpg"
                        style={{
                          width: "150px",
                          height: "150px",
                          margin: "auto",
                          objectFit: "cover",
                          objectPosition: "center",
                        }} />
                    </>
                  )}
                  <h5 className="my-3">{userData.userName}</h5>
                  {/*<p className="text-muted mb-1">Full Stack Developer</p>*/}
                  {/*<p className="text-muted mb-4">Bay Area, San Francisco, CA</p>*/}
                  {/*<div className="d-flex justify-content-center mb-2">*/}
                  {/*  <button type="button" className="btn btn-primary">Follow</button>*/}
                  {/*  <button type="button" className="btn btn-outline-primary ms-1">Message</button>*/}
                  {/*</div>*/}
                </div>
              </div>
              {/*<div className="card mb-4 mb-lg-0">*/}
              {/*  <div className="card-body p-0">*/}
              {/*    <ul className="list-group list-group-flush rounded-3">*/}
              {/*      <li className="list-group-item d-flex justify-content-between align-items-center p-3">*/}
              {/*        <i className="fas fa-globe fa-lg text-warning"></i>*/}
              {/*        <p className="mb-0">https://mdbootstrap.com</p>*/}
              {/*      </li>*/}
              {/*      <li className="list-group-item d-flex justify-content-between align-items-center p-3">*/}
              {/*        <i className="fab fa-github fa-lg" style={{ color: "#333333" }}></i>*/}
              {/*        <p className="mb-0">mdbootstrap</p>*/}
              {/*      </li>*/}
              {/*      <li className="list-group-item d-flex justify-content-between align-items-center p-3">*/}
              {/*        <i className="fab fa-twitter fa-lg" style={{ color: "#55acee" }}></i>*/}
              {/*        <p className="mb-0">@mdbootstrap</p>*/}
              {/*      </li>*/}
              {/*      <li className="list-group-item d-flex justify-content-between align-items-center p-3">*/}
              {/*        <i className="fab fa-instagram fa-lg" style={{ color: "#ac2bac" }}></i>*/}
              {/*        <p className="mb-0">mdbootstrap</p>*/}
              {/*      </li>*/}
              {/*      <li className="list-group-item d-flex justify-content-between align-items-center p-3">*/}
              {/*        <i className="fab fa-facebook-f fa-lg" style={{ color: "#3b5998" }}></i>*/}
              {/*        <p className="mb-0">mdbootstrap</p>*/}
              {/*      </li>*/}
              {/*    </ul>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Логин</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {userData.userName}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{userData.email}</p>
                    </div>
                  </div>
                  {/*<hr />*/}
                  {/*<div className="row">*/}
                  {/*  <div className="col-sm-3">*/}
                  {/*    <p className="mb-0">Phone</p>*/}
                  {/*  </div>*/}
                  {/*  <div className="col-sm-9">*/}
                  {/*    <p className="text-muted mb-0">(097) 234-5678</p>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  {/*<hr />*/}
                  {/*<div className="row">*/}
                  {/*  <div className="col-sm-3">*/}
                  {/*    <p className="mb-0">Mobile</p>*/}
                  {/*  </div>*/}
                  {/*  <div className="col-sm-9">*/}
                  {/*    <p className="text-muted mb-0">(098) 765-4321</p>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  {/*<hr />*/}
                  {/*<div className="row">*/}
                  {/*  <div className="col-sm-3">*/}
                  {/*    <p className="mb-0">Address</p>*/}
                  {/*  </div>*/}
                  {/*  <div className="col-sm-9">*/}
                  {/*    <p className="text-muted mb-0">Bay Area, San Francisco, CA</p>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                </div>
              </div>
              {/*<div>*/}
              {/*  {(isPostsLoading ? [...Array(1)] : userPosts.items).map((post, index) =>*/}
              {/*    isPostsLoading ? (*/}
              {/*      <Post key={index} isLoading={true} />*/}
              {/*    ) : (*/}
              {/*      <Post*/}
              {/*        id={post._id}*/}
              {/*        title={post.title}*/}
              {/*        imageUrl={post.imageUrl}*/}
              {/*        user={post.user}*/}
              {/*        createdAt={post.createdAt}*/}
              {/*        viewsCount={post.viewsCount}*/}
              {/*        commentsCount={3}*/}
              {/*        tags={post.tags}*/}
              {/*        isLoading={isPostsLoading}*/}
              {/*        isEditable={post.user._id === userData?._id}*/}
              {/*      />*/}
              {/*    ))}*/}
              {/*</div>*/}
              {/*<div className="row">*/}
              {/*  <div className="col-md-6">*/}
              {/*    <div className="card mb-4 mb-md-0">*/}
              {/*      <div className="card-body">*/}
              {/*        <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project*/}
              {/*          Status*/}
              {/*        </p>*/}
              {/*        <p className="mb-1" style={{ fontSize: ".77rem" }}>Web Design</p>*/}
              {/*        <div className="progress rounded" style={{ height: 5 }}>*/}
              {/*          <div className="progress-bar" role="progressbar" style={{ width: 80 }} aria-valuenow="80"*/}
              {/*               aria-valuemin="0" aria-valuemax="100"></div>*/}
              {/*        </div>*/}
              {/*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Website Markup</p>*/}
              {/*        <div className="progress rounded" style={{ height: 5 }}>*/}
              {/*          <div className="progress-bar" role="progressbar" style={{ width: "72%" }} aria-valuenow="72"*/}
              {/*               aria-valuemin="0" aria-valuemax="100"></div>*/}
              {/*        </div>*/}
              {/*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>One Page</p>*/}
              {/*        <div className="progress rounded" style={{ height: "5px" }}>*/}
              {/*          <div className="progress-bar" role="progressbar" style={{ width: "89%" }} aria-valuenow="89"*/}
              {/*               aria-valuemin="0" aria-valuemax="100"></div>*/}
              {/*        </div>*/}
              {/*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Mobile Template</p>*/}
              {/*        <div className="progress rounded" style={{ height: "5px" }}>*/}
              {/*          <div className="progress-bar" role="progressbar" style={{ width: "55%" }} aria-valuenow="55"*/}
              {/*               aria-valuemin="0" aria-valuemax="100"></div>*/}
              {/*        </div>*/}
              {/*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Backend API</p>*/}
              {/*        <div className="progress rounded mb-2" style={{ height: "5px" }}>*/}
              {/*          <div className="progress-bar" role="progressbar" style={{ width: "66%" }} aria-valuenow="66"*/}
              {/*               aria-valuemin="0" aria-valuemax="100"></div>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="col-md-6">*/}
              {/*    <div className="card mb-4 mb-md-0">*/}
              {/*      <div className="card-body">*/}
              {/*        <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project*/}
              {/*          Status*/}
              {/*        </p>*/}
              {/*        <p className="mb-1" style={{ fontSize: ".77rem" }}>Web Design</p>*/}
              {/*        <div className="progress rounded" style={{ height: "5px" }}>*/}
              {/*          <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="80"*/}
              {/*               aria-valuemin="0" aria-valuemax="100"></div>*/}
              {/*        </div>*/}
              {/*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Website Markup</p>*/}
              {/*        <div className="progress rounded" style={{ height: "5px" }}>*/}
              {/*          <div className="progress-bar" role="progressbar" style={{ width: "72%" }} aria-valuenow="72"*/}
              {/*               aria-valuemin="0" aria-valuemax="100"></div>*/}
              {/*        </div>*/}
              {/*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>One Page</p>*/}
              {/*        <div className="progress rounded" style={{ height: "5px" }}>*/}
              {/*          <div className="progress-bar" role="progressbar" style={{ width: "89%" }} aria-valuenow="89"*/}
              {/*               aria-valuemin="0" aria-valuemax="100"></div>*/}
              {/*        </div>*/}
              {/*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Mobile Template</p>*/}
              {/*        <div className="progress rounded" style={{ height: "5px" }}>*/}
              {/*          <div className="progress-bar" role="progressbar" style={{ width: "55%" }} aria-valuenow="55"*/}
              {/*               aria-valuemin="0" aria-valuemax="100"></div>*/}
              {/*        </div>*/}
              {/*        <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>Backend API</p>*/}
              {/*        <div className="progress rounded mb-2" style={{ height: "5px" }}>*/}
              {/*          <div className="progress-bar" role="progressbar" style={{ width: "66%" }} aria-valuenow="66"*/}
              {/*               aria-valuemin="0" aria-valuemax="100"></div>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className={styles.buttons} align="right">
            <Button onClick={() => onClickLogout()} variant="contained" color="error">Выйти</Button>
          </div>
        </div>
      </section>
    </>
  );
};
