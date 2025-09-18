import React from 'react';

export default function TextField({ label = '', placeholder = '', value, onChange, multiline = false, type = 'text', style }) {
  const InputTag = multiline ? 'textarea' : 'input';
  return (
    <label className="tf-root" style={style}>
      {label ? <div className="tf-label">{label}</div> : null}
      <div className="tf-field">
        <InputTag
          className="tf-input"
          type={multiline ? undefined : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={multiline ? 6 : undefined}
        />
      </div>
    </label>
  );
}


