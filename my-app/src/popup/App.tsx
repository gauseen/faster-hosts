import { useState, useEffect, useMemo } from 'react';
import { Drawer } from 'antd';

import Editor from './components/Editor'
import Header from './components/Header'
import SideMenu, { MenuItem } from './components/SideMenu'
import HostsForm, { Hosts, HostsTypeEnum, UpdateHostsIntervalEnum } from './components/HostsForm'

import './App.css';
import useStorage from './hooks/useStorage';
import { USING_HOSTS_ID, ACTIVE_HOSTS_ID, HOSTS } from '../const';

const operateTypeName = {
  add: '添加 Hosts',
  edit: '编辑 Hosts',
}

function App() {
  const [operateType, setOperateType] = useState<'add' | 'edit'>('add')
  const [visible, setVisible] = useState(false)
  const [content, setContent] = useState('')

  const { storage } = useStorage<Record<string, Hosts>>(HOSTS)
  const { storage: usingHostsId } = useStorage(USING_HOSTS_ID)
  const { storage: activeHostsId } = useStorage(ACTIVE_HOSTS_ID)

  const sideMenuList = useMemo(() => {
    return Object.keys(storage).map(id => {
      return {
        id,
        title: storage[id]?.title
      }
    })
  }, [storage])

  const activeHosts = useMemo(() => {
    return storage[activeHostsId || usingHostsId] as Hosts | undefined
  }, [storage, usingHostsId, activeHostsId])

  const handleAdd = () => {
    setOperateType('add')
    setVisible(true)
  }

  const handleEdit = (item?: MenuItem) => {
    chrome.storage.sync.set({ [ACTIVE_HOSTS_ID]: item?.id })
    setOperateType('edit')
    setVisible(true)
  }

  const handleChange = (item: MenuItem) => {
    chrome.storage.sync.set({ [ACTIVE_HOSTS_ID]: item?.id })
  }

  const readOnly = activeHosts?.hostsType === HostsTypeEnum.REMOTE

  return (
    <div className="faster_hosts" id="faster_hosts">
      <Header readOnly={readOnly} title={activeHosts?.title} onAdd={handleAdd}></Header>
      <div className="faster_hosts_body">
        <SideMenu id={activeHostsId || usingHostsId} onEditor={handleEdit} onChange={handleChange} list={sideMenuList} />
        <Editor onChange={(r) => console.log(r)} content={activeHosts?.content} readOnly={readOnly} />
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
        <h3>{operateTypeName[operateType]}</h3>
        <HostsForm
          id={activeHostsId || usingHostsId}
          type={operateType}
          title={activeHosts?.title}
          hostsType={activeHosts?.hostsType}
          remoteUrl={activeHosts?.remoteUrl}
          updateHostsInterval={activeHosts?.updateHostsInterval}
        >
        </HostsForm>
      </Drawer>
    </div>
  );
}

export default App;
