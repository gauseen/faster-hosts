import React, { useState, useEffect } from 'react'
import addIcon from '../../images/add.png'

import './style.css'

interface HeaderProps {
  title?: string;
  readOnly?: boolean;
  onAdd?: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const { title, readOnly, onAdd } = props;

  return <header className="header">
    <img src={addIcon} alt="add" onClick={onAdd} className="header_add" />
    <div className="header_title">
      {title}
      {readOnly && <span className="header_read_only">只读</span>}
    </div>
    <span className="header_setting"></span>
  </header>
}

export default Header
