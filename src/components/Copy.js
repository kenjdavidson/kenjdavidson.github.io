import React from 'react';

export default ({ children }) => {
  const year = new Date().getFullYear();

  return (
    <span>
      Copyright &copy; {year} {children}
    </span>
  );
};
