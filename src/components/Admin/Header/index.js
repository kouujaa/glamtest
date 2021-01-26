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

  componentDidUpdate = async (prevProps, prevState) => {
    // this.props.userClearPhase()
  }

  logout = async () => {
    await this.props.logout()
    this.props.history.push('/')
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="1"><Link to="/admin/profile">Profile</Link></Menu.Item>
        <Menu.Item key="2" onClick={this.logout.bind(this)}>Logout</Menu.Item>
      </Menu>
    )
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="w-100">
              <div className="dashboard_wrap_header-admin">
                <ul>
                  <li>
                    <div className="logo_dashboard_wrap">
                      <Link to="/home" ><img src="/images/Logo_Glamplug.svg" alt="" /></Link>
                    </div>
                    {/*<div className="notify_setting_wrap">
                      <i className="fas fa-bell"></i>
                      <i className="fas fa-cog"></i>
                    </div>*/}
                  </li>
                  <li>
                    <div className="admin_wrap">
                      <Dropdown overlayClassName={"overlay__class_dropdown"} overlay={menu}>
                        <p>Admin<i className="far fa-user-circle"></i><i className="fas fa-caret-down"></i></p>
                      </Dropdown>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Layout className="sub_header_dashboard-admin">
            <Header>
              <Menu
                theme="light"
                mode="horizontal"
                overflowedIndicator={<i className="fas fa-list"></i>}
                defaultSelectedKeys={[this.props.location.pathname]}
                selectedKeys={[this.props.location.pathname]}
              > 
                <Menu.Item key="/admin/home">
                  <Link to="/admin/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="/admin/salons">
                  <Link to="/admin/salons">Salons</Link>
                </Menu.Item>
                <Menu.Item key="/admin/users">
                  <Link to="/admin/users">Users</Link>
                </Menu.Item>
                <Menu.Item key="/admin/hair-style">
                  <Link to="/admin/hair-style">Hair Style</Link>
                </Menu.Item>
                <Menu.Item key="/admin/hair-type">
                  <Link to="/admin/hair-type">Hair Type</Link>
                </Menu.Item>
                <Menu.Item key="/admin/makeup-artists">
                  <Link to="/admin/makeup-artists">Makeup Artists</Link>
                </Menu.Item>
                <Menu.Item key="/admin/nail-techs">
                  <Link to="/admin/nail-techs">Nail Techs</Link>
                </Menu.Item>
                <Menu.Item key="/admin/lash-techs">
                  <Link to="/admin/lash-techs">Lash Techs</Link>
                </Menu.Item>
                <Menu.Item key="/admin/news-letter">
                  <Link to="/admin/news-letter">News-letter</Link>
                </Menu.Item>
                <Menu.Item key="/admin/contact-info">
                  <Link to="/admin/contact-info">Contact-info</Link>
                </Menu.Item>
                <Menu.Item key="/admin/orders">
                  <Link to="/admin/orders">Orders</Link>
                </Menu.Item>
              </Menu>
            </Header>
          </Layout>
        </div>
      </div>
    )
  }
}
