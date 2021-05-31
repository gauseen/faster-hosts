import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Radio, RadioChangeEvent } from 'antd';
import { HOSTS } from '../../../const';
import useStorage from '../../hooks/useStorage';

import './style.css'

const { Option } = Select;

export enum HostsTypeEnum {
  /** 本地 */
  LOCAL = 'local',
  /** 远程 */
  REMOTE = 'remote',
}

export enum UpdateHostsIntervalEnum {
  /** 从不执行 */
  NEVER = Number.MAX_SAFE_INTEGER,
  /** 5 分钟 */
  MIN_5 = 5 * 60 * 1000,
  /** 15 分钟 */
  MIN_15 = 15 * 60 * 1000,
  /** 1 小时 */
  HOUR_1 = 60 * 60 * 1000,
  /** 1 天 */
  ONE_DAY = 24 * 60 * 60 * 1000,
  /** 1 周 */
  ONE_WEEK = 7 * 24 * 60 * 60 * 1000,
}

interface HostsFormProps {
  type: 'add' | 'edit';
  title?: string;
  hostsType?: HostsTypeEnum;
  remoteUrl?: string;
  updateHostsInterval?: UpdateHostsIntervalEnum;
  id?: string;
  onCancel?: () => void;
}

export interface Hosts {
  id?: string;
  content?: string;
  title?: string;
  hostsType?: HostsTypeEnum;
  remoteUrl?: string;
  updateHostsInterval?: UpdateHostsIntervalEnum;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 },
};

const tailLayout = {
  wrapperCol: { span: 24 },
};

const generateHostsId = () => `hosts_id_${Date.now()}`

const HostsForm: React.FC<HostsFormProps> = (props) => {
  const { hostsType, type, id, remoteUrl, onCancel } = props
  const [form] = Form.useForm<Hosts>();

  const { storage } = useStorage(HOSTS)
  const isAdd = type === 'add'

  const onFinish = async (values: Hosts) => {
    const finalId = isAdd ? generateHostsId() : (id || '')

    let content = ''
    let currentHosts = { ...values }

    if (hostsType === HostsTypeEnum.REMOTE && remoteUrl) {
      content = await fetch(remoteUrl).then(res => res.text())
    }

    if (content) {
      currentHosts = { ...values, content }
    }

    const finalVal = {
      ...storage,
      [finalId]: currentHosts,
    }
    chrome.storage.sync.set({ [HOSTS]: finalVal })
    onCancel?.()
  };

  const handleDelete = () => {
    delete storage[id!]
    chrome.storage.sync.set({ [HOSTS]: storage })
    onCancel?.()
  }

  useEffect(() => {
    const { hostsType, title, remoteUrl, updateHostsInterval } = props

    if (isAdd) {
      form.resetFields()
    } else {
      form.setFieldsValue({
        hostsType,
        title,
        remoteUrl,
        updateHostsInterval,
      })
    }
  }, [form, props, isAdd])

  const [hostsTypeValue, setHostsTypeValue] = useState<HostsTypeEnum | undefined>(!isAdd ? hostsType : undefined)
  const isRemote = hostsTypeValue === HostsTypeEnum.REMOTE
  const handleChangeHostsType = (e: RadioChangeEvent) => {
    setHostsTypeValue(e.target.value)
  }

  return (
    <Form {...layout} form={form} layout="vertical" name="control-hooks" onFinish={onFinish}>

      <Form.Item name="hostsType" label="类型" rules={[{ required: true, message: 'hosts 类型不能为空' }]}>
        <Radio.Group onChange={handleChangeHostsType} disabled={!isAdd}>
          <Radio value={HostsTypeEnum.LOCAL}>本地</Radio>
          <Radio value={HostsTypeEnum.REMOTE}>远程</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="title" label="标题" rules={[{ required: true, message: '标题不能为空' }]}>
        <Input />
      </Form.Item>

      {
        isRemote && <Form.Item name="remoteUrl" label="URL" rules={[{ required: true, message: 'url 不能为空' }]}>
          <Input />
        </Form.Item>
      }

      {isRemote && (
        <Form.Item name="updateHostsInterval" label="自动刷新" rules={[{ required: true, message: '请选择自动刷新间隔' }]}>
          <Select
            placeholder="请选择自动刷新间隔"
          >
            <Option value={UpdateHostsIntervalEnum.NEVER}>从不</Option>
            <Option value={UpdateHostsIntervalEnum.MIN_5}>5 分钟</Option>
            <Option value={UpdateHostsIntervalEnum.MIN_15}>15 分钟</Option>
            <Option value={UpdateHostsIntervalEnum.HOUR_1}>1 小时</Option>
            <Option value={UpdateHostsIntervalEnum.ONE_DAY}>24 小时</Option>
            <Option value={UpdateHostsIntervalEnum.ONE_WEEK}>7 天</Option>
          </Select>
        </Form.Item>
      )}

      <Form.Item {...tailLayout} style={{ marginBottom: '0' }}>
        <div className="hosts_form_buttons">
          <Button danger onClick={handleDelete}>
            删除
          </Button>

          <div className="hosts_form_buttons_normal">
            <Button onClick={onCancel}>
              取消
            </Button>
            &nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </div>
        </div>
      </Form.Item>
    </Form>
  )
}

export default HostsForm
