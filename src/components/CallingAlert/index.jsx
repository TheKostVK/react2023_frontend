import React from 'react';
import { Alert } from '@mui/material';


export const CallingAlert = (type, desc) => {

  // Это сообщение об ошибке
  if (type === "error") {
    return (
      <div>
        <Alert variant="filled" severity="error">
          {desc}
        </Alert>
      </div>
    );
  }

  // Это предупреждение
  if (type === "warning") {
    return (
      <div>
        <Alert variant="filled" severity="warning">
          {desc}
        </Alert>
      </div>
    );
  }

  // Это информационное сообщение
  if (type === "info") {
    return (
      <div>
        <Alert variant="filled" severity="info">
          {desc}
        </Alert>
      </div>
    );
  }

  // Это сообщение об успешном действии
  if (type === "success") {
    return (
      <div>
        <Alert variant="filled" severity="success">
          {desc}
        </Alert>
      </div>
    );
  }

};

export default CallingAlert;