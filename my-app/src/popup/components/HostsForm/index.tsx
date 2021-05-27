import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select, Radio } from 'antd';
import { HOSTS } from '../../../const';
import useStorage from '../../hooks/useStorage';

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
  wrapperCol: { offset: 8, span: 16 },
};

const generateHostsId = () => `hosts_id_${Date.now()}`

const HostsForm: React.FC<HostsFormProps> = (props) => {
  const { hostsType, type, id, remoteUrl } = props
  const [form] = Form.useForm<Hosts>();

  const { storage } = useStorage(HOSTS)

  const onFinish = async (values: Hosts) => {
    const finalId = type === 'add' ? generateHostsId() : (id || '')

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
  };

  useEffect(() => {
    const { hostsType, title, remoteUrl, updateHostsInterval } = props
    form.setFieldsValue({
      hostsType,
      title,
      remoteUrl,
      updateHostsInterval,
    })
  }, [form, props])

  return (
    <Form {...layout} form={form} layout="vertical" name="control-hooks" onFinish={onFinish}>

      <Form.Item name="hostsType" label="类型" rules={[{ required: true }]}>
        <Radio.Group>
          <Radio value={HostsTypeEnum.LOCAL}>本地</Radio>
          <Radio value={HostsTypeEnum.REMOTE}>远程</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="title" label="标题" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="remoteUrl" label="URL" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="updateHostsInterval" label="自动刷新" rules={[{ required: true }]}>
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

      <Form.Item {...tailLayout}>
        <Button>
          取消
        </Button>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Form.Item>
    </Form>
  )
}

export default HostsForm
