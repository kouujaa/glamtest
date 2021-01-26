import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { withCookies } from 'react-cookie'
import Cookies from 'js-cookie'
import UserHeader from "./components/User/Header/container"
import UserFooter from "./components/User/Footer"
import { Layout } from 'antd';

import UserDashboard from './components/User/Dashboard/container'
import UserEditProfile from './components/User/EditProfile/container'
import UserResetPassword from './components/User/ResetPassword/container'
//import UserFavorite from './components/User/Favorites/container'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
const {  Footer, Content } = Layout;

const PrivateRoute = ({ component, ...rest }) => {
    const user = Cookies.get('authToken')
    const isAuthed = user ? true : false
    return (
        <Route
            {...rest}
            exact
            render={props =>
                isAuthed ? (
                    <div>{React.createElement(component, props)}</div>
                ) : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.func]).isRequired,
    location: PropTypes.object
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthed: false
        }
    }

    render() {
      let { isAuthed } = this.state
        return (
          <React.Fragment>
            <Layout>
              <UserHeader {...this.props} />
                <Switch>
                  <Layout>
                    <Content className="main_wrap_dashboard">
                    <Route exact path="user" component={UserDashboard} isAuthed={isAuthed} />
                    <Route path="/user/home" component={UserDashboard}/>
                    <Route path="/user/edit-profile" component={UserEditProfile}/>
                    <Route path="/user/reset-password" component={UserResetPassword}/>
                    {/* <Route path="/user/favorites" component={UserFavorite} /> */}
                    </Content>
                  </Layout>
                </Switch>
              <Footer className="footer_wrap_dashboard"><UserFooter /></Footer>
            </Layout>
          </React.Fragment>
        )
    }
}

export default withRouter(withCookies(App))
