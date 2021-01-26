import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { Layout, Menu, Dropdown } from 'antd';
import './styles.scss'
import { Link } from "react-router-dom";
const { Header } = Layout

export default class HeaderComponent extends PureComponent {

  static propTypes = {
    // PropTypes go here
  }

  logout = async () => {
    await this.props.logout()
    this.props.history.push('/')
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.logout.bind(this)}>Logout</Menu.Item>
      </Menu>
    )
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="w-100">
              <div className="dashboard_wrap_header-user">
                <ul>
                  <li>
                    <div className="logo_dashboard_wrap">
                      <Link to="/home" ><img src="/images/Logo_Glamplug.svg" alt="" /></Link>
                    </div>
                  </li>
                  <li>
                    <div className="admin_wrap">
                      <Dropdown overlayClassName={"overlay__class_dropdown"} overlay={menu}>
                        <p>User<i className="far fa-user-circle"></i><i className="fas fa-caret-down"></i></p>
                      </Dropdown>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Layout className="sub_header_dashboard-user">
            <Header>
              <Menu
                theme="light"
                mode="horizontal"
                overflowedIndicator={<i className="fas fa-list"></i>}
                defaultSelectedKeys={[this.props.location.pathname]}
                selectedKeys={[this.props.location.pathname]}
              > 
                <Menu.Item key="/user/home">
                  <Link to="/user/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="/user/edit-profile">
                  <Link to="/user/edit-profile">Edit-Profile</Link>
                </Menu.Item>
                <Menu.Item key="/user/reset-password">
                  <Link to="/user/reset-password">Reset-Password</Link>
                </Menu.Item>
                {/* <Menu.Item key="/user/favorites">
                  <Link to="/user/favorites">Favourites</Link>
                </Menu.Item> */}
              </Menu>
            </Header>
          </Layout>
        </div>
      </div>
    )
  }
}
