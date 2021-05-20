import { useState, useEffect } from 'react';
import { Drawer } from 'antd';

import Editor from './components/Editor'
import Header from './components/Header'
import SideMenu, { MenuItem } from './components/SideMenu'

import './App.css';

function App() {
  const [visible, setVisible] = useState(false)

  const content = `
    1111 local1
    22222 local2
  `

  const menuList: MenuItem[] = [
    { text: '111', value: 'key1' },
    { text: '222', value: 'key2' },
  ]

  const [menuValue, setMenuValue] = useState('key1')

  return (
    <div className="faster_hosts" id="faster_hosts">
      <Header readOnly={true} title="111111" onAdd={() => setVisible(true)}></Header>
      <div className="faster_hosts_body">
        <SideMenu value={menuValue} onEditor={() => setVisible(true)} onChange={setMenuValue} list={menuList} />
        <Editor onChange={(r) => console.log(r)} content={content} readOnly={false} />
      </div>

      <Drawer
        placement="right"
        closable={false}
        visible={visible}
        onClose={() => setVisible(false)}
        width="80%"
        getContainer="#faster_hosts"
        style={{ position: 'absolute' }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}

export default App;
