import React from 'react';

export default ({name, children}) => {
  const year = new Date().getFullYear();
  
  return (
    <span>Copyright &copy; {year} {children}</span>
  );
}