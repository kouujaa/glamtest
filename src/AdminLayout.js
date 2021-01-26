import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { withCookies } from 'react-cookie'
import Cookies from 'js-cookie'
import HeaderMain from "./components/Admin/Header/container"
import FooterMain from "./components/Admin/Footer"
// import SideNav from "./components/Admin/SideNav"
import { Layout } from 'antd';

import AdminDashboard from './components/Admin/Dashboard/container'
import AdminSalonsContainer from './components/Admin/Salons/container'
import AdminHairTypesContainer from './components/Admin/HairTypes/container'
import AdminUsersContainer from './components/Admin/Users/container'
import AdminHairStylesContainer from './components/Admin/HairStyles/container'
import AdminMakeupArtistsContainer from './components/Admin/MakeupArtists/container'
import AdminNailTechsContainer from './components/Admin/NailTechs/container'
import Adminprofile from './components/Admin/Profile/container'
import NewsLetter from './components/Admin/NewsLetter/container'
import ContactInfo from './components/Admin/ContactInfo/container'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import Orders from './components/Admin/Orders/container'
import AdminLashTechsContainer from './components/Admin/LashTechs/container'
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
              <HeaderMain {...this.props} />
                <Switch>
                  <Layout>
                    <Content className="main_wrap_dashboard">
                    {/*<Route exact path="/admin/:page" render={() =>
                      <Redirect to="/admin/home" />
                    } />*/}
                    <Route exact path="/admin" component={AdminDashboard} isAuthed={isAuthed} />
                    <Route path={`/admin/home`} component={AdminDashboard} />
                    <Route path={`/admin/salons`} component={AdminSalonsContainer} isAuthed={isAuthed} />
                    <Route path={`/admin/users`} component={AdminUsersContainer} isAuthed={isAuthed} />
                    <Route path={`/admin/hair-type`} component={AdminHairTypesContainer} isAuthed={isAuthed} />
                    <Route path={`/admin/hair-style`} component={AdminHairStylesContainer} isAuthed={isAuthed} />
                    <Route path={`/admin/nail-techs`} component={AdminNailTechsContainer} isAuthed={isAuthed} />
                    <Route path={`/admin/makeup-artists`} component={AdminMakeupArtistsContainer} isAuthed={isAuthed} />
                    <Route path={`/admin/lash-techs`} component={AdminLashTechsContainer}  isAuthed={isAuthed} />
                    <Route path={`/admin/profile`} component={Adminprofile} isAuthed={isAuthed} />
                    <Route path={`/admin/news-letter`} component={NewsLetter} isAuthed={isAuthed} />
                    <Route path={`/admin/contact-info`} component={ContactInfo} isAuthed={isAuthed} />
                    <Route path={`/admin/orders`} component={Orders} isAuthed={isAuthed} />
                    </Content>
                  </Layout>
                </Switch>
              <Footer className="footer_wrap_dashboard"><FooterMain /></Footer>
            </Layout>
          </React.Fragment>
        )
    }
}

export default withRouter(withCookies(App))
