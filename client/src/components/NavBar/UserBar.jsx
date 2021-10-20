import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
export default function UserBar() {

    const menu = (<Menu>
        <Menu.Item>
          Trang cá nhân
        </Menu.Item>
        <Menu.Item>
          Đăng xuất
        </Menu.Item>
        
      </Menu>
    );
    return (
        <div>
            <Dropdown overlay={menu} placement = "bottomRight">
            <div className="nav__user">
                <Avatar icon={<UserOutlined />} />
                <p className = "nav__user__name">Lê Vỹ</p>
                </div>
            </Dropdown>      
        </div>
    )
}
