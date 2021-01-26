import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import _ from 'lodash'
import { NavLink,withRouter } from "react-router-dom"
import { Layout, Menu, Dropdown } from 'antd'
import Cookies from 'js-cookie'
import './styles.scss'
const { Header } = Layout;

const transparentHeaderToShow = ["/home", "/"]


 class TopNavComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      toShowHomeHeader: true,
      user: false,
      loginUser: '',
      Role: '',
      cartlen:0
    }
  }

  async logout() {
    await this.props.logout()
    // this.props.history.push('/')
    window.location.reload()
  }

  backToDashboard() {
    if (this.state.Role === 'ADMIN') {
      this.props.history.push('/admin/home')
    }
    if (this.state.Role === 'STYLIST') {
      this.props.history.push('/stylist/home')
    }
    if (this.state.Role === 'USER') {
      this.props.history.push('/user/home')
    }
  }

  async componentDidMount() {
    const user = Cookies.get('authToken')

    if (user) {
      const result = await this.props.getUser(user)
      if (result.value.status === true) {
        this.setState({
          loginUser: result.value.users,
          Role: _.get(result, 'value.users.role[0]', '')
        })
      }
    }

    const isAuthed = user ? true : false
    if (isAuthed) {
      this.setState({ user: true })
    }
    this.onRouteChanged()

    //cart
    const cartData = Cookies.get('cartData')
    if(cartData){
      const servicesToRender = JSON.parse(cartData).service.filter(service => service)
      const numService = servicesToRender.length
      this.setState({cartlen: numService})
    }
  }


  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }


  onRouteChanged = () => {
    const { pathname } = this.props.location;
    let val = transparentHeaderToShow.includes(pathname) ? true : false
    this.setState({ toShowHomeHeader: val })

    this.forceUpdate()
  }



  render() {
    const { pathname } = this.props.location;
    const { toShowHomeHeader, user } = this.state
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.backToDashboard.bind(this)}>Dashboard</Menu.Item>
        <Menu.Item key="2" onClick={this.logout.bind(this)}>Logout</Menu.Item>
      </Menu>
    )

    return (
      <div>
        <Header className={`${!toShowHomeHeader ? "header__background_white" : "header__wrapper"} `}>
          <div className="header__layout">
            {/* <div className="toppest_nav">
              <ul>
                <li>
                  <NavLink to="/feedback">Feedback</NavLink>
                </li>
                <li>
                  <NavLink to="/customer-support">Support</NavLink>
                </li>
                <li>
                  {user ?
                    <Dropdown overlayClassName={"overlay__class_dropdown"} overlay={menu}>
                      <a href="#!" className="ant-dropdown-NavLink" onClick={e => e.preventDefault()}>
                        My Account <i className="far fa-user-circle"></i>
                      </a>
                    </Dropdown>
                    :
                    <NavLink to="/login">Login <i className="far fa-user-circle"></i></NavLink>
                  }

                </li>
              </ul>
            </div> */}
            <div className="header__logo">
              {
                toShowHomeHeader ?
                  <NavLink to="/home"><img src="/images/Logo_Glamplug_White.svg" alt="" /></NavLink>
                  :
                  <NavLink to="/home"><img src="/images/Logo_Glamplug.svg" alt="" /></NavLink>
              }
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[pathname]}
              style={{ lineHeight: '64px' }}
              overflowedIndicator={<i className="fas fa-list"></i>}
              className="testingtestingtestingtestingtestin"
              selectedKeys={[this.props.location.pathname,]}            >
              <Menu.Item key="/home" >
                <NavLink to="/home">Home</NavLink>
              </Menu.Item>
              <Menu.Item key="/salons" >
                <NavLink to="/salons">Hair</NavLink>
              </Menu.Item>
              <Menu.Item key="/makeup-artists" >
                <NavLink to="/makeup-artists">Makeup</NavLink>
              </Menu.Item>
              <Menu.Item key="/nail-techs" >
                <NavLink to="/nail-techs">Nail</NavLink>
              </Menu.Item>
              <Menu.Item key="/lash-techs" >
                <NavLink to="/lash-techs">Lashes</NavLink>
              </Menu.Item>
              <Menu.Item key="/about-us">
                <NavLink to="/about-us">About Us</NavLink>
              </Menu.Item>
              {/* <Menu.Item key="/contact-us">
                <NavLink to="/contact-us">Contact Us</NavLink>
              </Menu.Item> */}
              {!user ?
                <Menu.Item key="/signup">
                  <NavLink to="/signup">Sign Up</NavLink>
                </Menu.Item>
                : ''
              }
              <Menu.Item key="/aaa">
                {user ?
                  <Dropdown overlayClassName={"overlay__class_dropdown"} overlay={menu}>
                    <a href="#!" className="ant-dropdown-NavLink" onClick={e => e.preventDefault()}>
                      My Account <i className="far fa-user-circle"></i>
                    </a>
                  </Dropdown>
                  :
                  <NavLink to="/login">Log In <i className="far fa-user-circle"></i></NavLink>
                }
              </Menu.Item>
              <Menu.Item>
              <NavLink to="/cart"><i className="fa fa-shopping-cart"></i><span style={{position: 'absolute', top: '-10px', right: '10px', fontSize: '15px'}}>{this.state.cartlen}</span></NavLink>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
      </div>
    )
  }
}


export default withRouter(TopNavComponent)
