/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React, { useState } from 'react';
import Head from 'next/head'
import { projectService } from '../services';
import { useRouter } from 'next/router';

import { Button, Layout, Menu, Modal, Table, Form, Input, Select, Space, Popconfirm, message } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const ProjectCreateForm = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new Project"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="name"
          label="Project Name"
          rules={[
            {
              required: true,
              message: 'required',
            },
          ]}
        >
          <Input placeholder="Project Name" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Project Status"
          rules={[
            {
              required: true,
              message: 'required',
            },
          ]}>
          <Select placeholder="Project Status">
            <Option value="pending">Pending</Option>
            <Option value="ongoing">Ongoing</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const { Header, Sider, Content, Footer } = Layout;

const Home = (props) => {
  const { projects } = props;
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    projectService.createProject(values)
      .then(res => {
        router.replace(router.asPath);
        setVisible(false);
        message.success('Added');
      }).catch(error => {
        message.error('Error');
      })
  };

  const onDelete = (id) => {
    projectService.deleteProject(id)
      .then(res => {
        message.success('Deleted');
        router.replace(router.asPath);
      })
      .catch(error => {
        message.error('Error');
      });
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => onDelete(record._id)}
            //onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Layout className="site-nav-layout" style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                setVisible(true);
              }}
            >
              New Project
            </Button>
            <br />
            <br />
            <ProjectCreateForm
              visible={visible}
              onCreate={onCreate}
              onCancel={() => {
                setVisible(false);
              }}
            />
            <Table dataSource={projects || []} columns={columns} rowKey="_id" />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </div>
  )
}

Home.getInitialProps = async ({ req, res }) => {
  try {
    const projects = await projectService.getProjects()
      .then(response => {
        return response.data || {};
      })

    return { projects: projects || [] }
  }
  catch (error) {
    console.log(error);
    return { projects: [] }
  }
}
export default Home