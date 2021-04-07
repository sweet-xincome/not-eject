/*
 * @Author: jing
 * @Date: 2021-03-31 14:06:58
 * @LastEditTime: 2021-04-06 18:02:26
 * @LastEditors: Jing
 * @Description: App main
 * @FilePath: /not-eject/src/App.tsx
 */
import React, { FC, useState } from 'react';
import './App.less';

import { Layout, Menu, Tabs, Button, Tag } from 'antd';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;
const { CheckableTag } = Tag;

const tagsData = ['旋转', '移动', '剖析', '计算'];

const App: FC = () => {
  const [panes, setPanes] = useState([
    { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
    { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
  ]);
  const [activeKey, setActiveKey] = useState<string>(panes[0]?.key);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const add = (): void => {
    const tempActiveKey = `newTab${panes.length + 1}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: tempActiveKey });

    setActiveKey(tempActiveKey);
    setPanes(panes);
  };

  const onChange = (activeKey: string): void => {
    setActiveKey(activeKey);
  };

  const onEdit = (targetKey: unknown): void => {
    let lastIndex = 0;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    const filterPanes = panes.filter((pane) => pane.key !== targetKey);
    let tempActiveKey = '0';
    if (filterPanes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        tempActiveKey = panes[lastIndex].key;
      } else {
        tempActiveKey = panes[0].key;
      }
    }
    setPanes(filterPanes);
    setActiveKey(tempActiveKey);

    console.log(tempActiveKey);
  };

  const handleChange = (tag: string, checked: boolean): void => {
    console.log(tag, checked);
    // const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag); // 多选
    const nextSelectedTags = checked ? [tag] : selectedTags.filter((t) => t !== tag); // 单选
    setSelectedTags(nextSelectedTags);
  };

  return (
    <div>
      <Layout>
        <Header className="header">
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px' }}>
            <Button onClick={add} style={{ marginRight: 10 }}>
              ADD
            </Button>

            {tagsData.map((tag) => (
              <CheckableTag
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={(checked) => handleChange(tag, checked)}
                className={selectedTags.indexOf(tag) > -1 ? 'check-tag--selected' : 'check-tag--unselected'}
              >
                {tag}
              </CheckableTag>
            ))}
          </div>
        </Header>

        <Layout style={{ marginTop: 5, marginBottom: 5 }}>
          <Sider
            width={200}
            className="site-layout-background"
            style={{ overflow: 'auto', overflowX: 'hidden', height: `${window.innerHeight - 100 - 10}px` }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="1">文件1</Menu.Item>
              <Menu.Item key="2">文件2</Menu.Item>
              <SubMenu key="sub1" title="文件夹一">
                <Menu.Item key="3">文件3</Menu.Item>
                <Menu.Item key="4">文件4</Menu.Item>
                <SubMenu key="sub1-2" title="文件夹二">
                  <Menu.Item key="5">文件5</Menu.Item>
                  <Menu.Item key="6">文件6</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu key="sub2" title="文件夹三">
                <Menu.Item key="7">文件7</Menu.Item>
                <Menu.Item key="8">文件8</Menu.Item>
                <Menu.Item key="9">文件9</Menu.Item>
                <Menu.Item key="10">文件10</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title="文件夹四">
                <Menu.Item key="11">文件11</Menu.Item>
                <Menu.Item key="12">文件12</Menu.Item>
                <Menu.Item key="13">文件13</Menu.Item>
                <Menu.Item key="14">文件14</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>

          <Layout style={{ padding: '0px 5px 0 5px' }}>
            <Content className="site-layout-background">
              <Tabs hideAdd onChange={onChange} activeKey={activeKey} type="editable-card" onEdit={onEdit}>
                {panes.map((pane) => (
                  <TabPane tab={pane.title} key={pane.key}>
                    <div className="tab-content" style={{ height: `${window.innerHeight - 100 - 47 - 8}px` }}>
                      <p>{pane.content}</p>
                    </div>
                  </TabPane>
                ))}
              </Tabs>
            </Content>
          </Layout>

          <Sider width={200} className="site-layout-background" style={{ background: 'white' }}>
            {}
            <div style={{ lineHeight: '10px' }}>
              <CloseOutlined
                onClick={() => console.log('click')}
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: 12,
                  color: 'rgb(140,140,140)',
                  border: '1px solid rgb(140, 140, 140)',
                }}
              />
            </div>
          </Sider>
        </Layout>
      </Layout>
    </div>
  );
};

export default App;
