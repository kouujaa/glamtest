import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { withCookies } from 'react-cookie'
import Cookies from 'js-cookie'
import StylistHeader from "./components/Stylist/Header/container"
import StylistFooter from "./components/Stylist/Footer"
import { Layout } from 'antd';

import StylistDashboard from './components/Stylist/Dashboard/container'
import StylistEditProfile from './components/Stylist/EditProfile/container'
import StylistResetPassword from './components/Stylist/ResetPassword/container'
import StylistOrder from './components/Stylist/Orders/container'
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
              <StylistHeader {...this.props} />
                <Switch>
                  <Layout>
                    <Content className="main_wrap_dashboard">
                    <Route exact path="stylist" component={StylistDashboard} isAuthed={isAuthed} />
                    <Route path="/stylist/home" component={StylistDashboard} isAuthed={isAuthed}/>
                    <Route path="/stylist/edit-profile" component={StylistEditProfile} isAuthed={isAuthed}/>
                    <Route path="/stylist/reset-password" component={StylistResetPassword} isAuthed={isAuthed}/>
                    <Route path="/stylist/orders" component={StylistOrder} isAuthed={isAuthed} />
                    </Content>
                  </Layout>
                </Switch>
              <Footer className="footer_wrap_dashboard"><StylistFooter /></Footer>
            </Layout>
          </React.Fragment>
        )
    }
}

export default withRouter(withCookies(App))
