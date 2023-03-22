import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ avatarUrl, userName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatarUrl || '/noavatar.png'} alt={userName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{userName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
