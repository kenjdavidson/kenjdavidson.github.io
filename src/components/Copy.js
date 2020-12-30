import React from 'react';

export default ({ children }) => {
  const year = new Date().getFullYear();

  return (
    <span>
      &copy; {year} {children}
    </span>
  );
};
