import React from 'react';
import {} from 'antd';
import './NavBar.scss';
import {NavLink} from 'react-router-dom'
import DebounceSearch from './DebounceSearch';
// import { Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import UserBar from './UserBar';
export default function NavBar() {
    return (
        <div className = "nav">
            <div className="container nav__wrapper">
                <NavLink to ="/">
                <span className="nav__logo">
                    VyTruyen
                </span>
                </NavLink>

                <div className="nav__links">
                 <NavLink className = "nav__link" to = '/category' activeClassName="nav__link--selected">thế loại</NavLink>
                 <NavLink className = "nav__link" to = '/news' activeClassName="nav__link--selected">Tin tức</NavLink>   
                </div>

                <DebounceSearch />

                {/* <div className="nav__user">
                <Avatar icon={<UserOutlined />} />
                <p className = "nav__user__name">Lê Vỹ</p>
                </div> */}

                <UserBar />
            </div>
        </div>
    )
}
