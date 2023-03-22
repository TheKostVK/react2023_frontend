import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {useDispatch, useSelector} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);

    const onClickLogout = () => {
        if (window.confirm('Вы хотите выйти из аккаунта?')) {
            dispatch(logout());
        }
    };

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>react2023</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to="/posts/create">
                                    <Button variant="contained">Написать статью</Button>
                                </Link>
                                <Button onClick={onClickLogout} variant="contained" color="error">
                                    Выйти
                                </Button>
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
    );
};
