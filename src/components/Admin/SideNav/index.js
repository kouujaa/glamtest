import React, { PureComponent } from 'react'
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom"
// import PropTypes from 'prop-types'

import './styles.scss'

const { SubMenu } = Menu;

export default class SideNavComponent extends PureComponent {

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  constructor(props) {
    super(props)

    this.state = {
      openKeys: ['sub1']
    }
  }

  static propTypes = {
    // PropTypes go here
  }


  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <>
        <div className="sidenav_wrap">
          
          <Menu
            mode="inline"
            onOpenChange={this.onOpenChange}
            style={{ width: 256 }}
          >
            <h1 className="title">Dashboard</h1>
            <SubMenu
              key="salons"
              className="submenu__wrap"
              title={
                <span >
                  <span>Salons</span>
                </span>
              }
            >
              <Menu.Item key="1"><Link to='/admin/Salons'>All Salons</Link></Menu.Item>
              <Menu.Item key="2">Add Salon</Menu.Item>
              <Menu.Item key="3">Edit Salon</Menu.Item>
            </SubMenu>

            <SubMenu
              key="hairstyles"
              className="submenu__wrap"
              title={
                <span>
                  <span>Hairstyles</span>
                </span>
              }
            >
              <Menu.Item key="4"><Link to='/admin/Stylist'>All Hairstyles</Link></Menu.Item>
              <Menu.Item key="5">Add Hairstyles</Menu.Item>
              <Menu.Item key="6">Edit Hairstyles</Menu.Item>
            </SubMenu>

            <SubMenu
              key="hairtypes"
              className="submenu__wrap"
              title={
                <span>
                  <span>HairTypes</span>
                </span>
              }
            >
              <Menu.Item key="7"><Link to='/admin/HairTypes'>All HairTypes</Link></Menu.Item>
              <Menu.Item key="8">Add HairTypes</Menu.Item>
              <Menu.Item key="9">Edit HairTypes</Menu.Item>
            </SubMenu>

            <SubMenu
              key="users"
              className="submenu__wrap"
              title={
                <span>
                  <span>Users</span>
                </span>
              }
            >
              <Menu.Item key="10"><Link to='/admin/Users'>Users</Link></Menu.Item>
              <Menu.Item key="11">Option 2</Menu.Item>
              <Menu.Item key="12">Option 3</Menu.Item>
            </SubMenu>

            <SubMenu
              key="statistics"
              className="submenu__wrap"
              title={
                <span>
                  <span>Statistics</span>
                </span>
              }
            >
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </SubMenu>

            {/* <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="setting" />
                  <span>Navigation Three</span>
                </span>
              }
            >
              <Menu.Item key="9"><Link to='/admin/Stylist'>HairStylist</Link></Menu.Item>
              <Menu.Item key="10"> <Link to='/admin/Salons'>Salons</Link></Menu.Item>
              <Menu.Item key="11"><Link to='/admin/HairTypes'>HairTypes</Link></Menu.Item>
              <Menu.Item key="12"> <Link to='/admin/Users'>Users</Link></Menu.Item>
            </SubMenu> */}
          </Menu>
        </div>
      </>
    )
  }
}
