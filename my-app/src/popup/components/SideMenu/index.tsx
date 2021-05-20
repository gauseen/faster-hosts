import React, { useState, useEffect } from 'react'
import editorIcon from '../../images/editor.png'

import './style.css'

export interface MenuItem {
  text?: string;
  value?: string;
}

interface SideMenuProps {
  list: MenuItem[];
  value?: string;
  onChange?: (value: string) => void;
  onEditor?: (item?: MenuItem) => void;
}

const SideMenu: React.FC<SideMenuProps> = (props) => {
  const { list, value, onChange, onEditor } = props;

  const handleClick = (newValue?: string) => {
    if (value !== newValue) {
      newValue && onChange?.(newValue)
    }
  }

  const handleEditor = (current: MenuItem) => {
    onEditor?.(current)
  }

  useEffect(() => {

  }, [])

  return (
    <ul className="side_menu">
      {list.map(item => {
        const selected = value === item.value
        return (
          <li onClick={() => handleClick(item.value)} className={`${selected ? 'side_menu_item__selected' : null} side_menu_item`} key={item.value}>
            <span>{item.text}</span>
            <div>
              {selected && <img onClick={() => handleEditor(item)} className="side_menu_item_editor" src={editorIcon} alt="editor" />}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default SideMenu
