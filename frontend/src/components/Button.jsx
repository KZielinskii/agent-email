import React from 'react';

export default function Button({ children, onClick, type = 'button', style }) {
  return (
    <button className="btn-root" type={type} onClick={onClick} style={style}>
      {children}
    </button>
  );
}


