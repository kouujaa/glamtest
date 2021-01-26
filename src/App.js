import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { withCookies } from 'react-cookie'
import Cookies from 'js-cookie'
import LoginContainer from './components/Login/container'
import SignupContainer from './components/Signup/container'
import ForgetPassword from './components/ForgetPassword/container'
import UpdatePassword from './components/UpdatePassword/container'
import Home from './components/Home/container'
import Salons from './components/Salons/container'
import Salon from './components/Salon/container'
import MakeupArtists from './components/MakeupArtists/container'
import NailTechs from './components/NailTechs/container'
import HairDetails from './components/HairDetails/container'
import ContactUs from './components/ContactUs/container'
import AboutUs from './components/AboutUs'
import Feedback from './components/Feedback'
import Terms from './components/TermsAndConditions'
import Privacy from './components/Privacy'
import FAQ from './components/Faq'
import TopNav from './components/TopNav/container'
import Footer from './components/Footer/container'
import Cart from './components/Cart/container'

import AdminLayout from "./AdminLayout"
import StylistLayout from "./StylistLayout"
import UserLayout from "./UserLayout"
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import LandingPage from './components/LandingPage/container'
import LashTechs from './components/LashTechs/container'
import AdminSignup from './components/Admin/SignUp/container'

const { Content } = Layout

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
    }
  }
componentDidMount(){
  console.log(process.env)
}
  render() {
    return (
      <div>
        <React.Fragment>
          <div className="App-Container">
            <Switch>
              <Route exact path='/landing-page' component={LandingPage} />
              <Route exact path="/login" component={LoginContainer} {...this.props} />
              <Route exact path="/signup" component={SignupContainer} {...this.props} />
              <Route exact path="/forget-password" component={ForgetPassword} {...this.props} />
              <Route exact path="/update-password/:id" component={UpdatePassword} {...this.props} />
              <Route exact path="/auth/admin/create" component={AdminSignup} {...this.props} />
              <PrivateRoute path="/admin/:page" component={AdminLayout} />
              <PrivateRoute path="/stylist/:page" component={StylistLayout} />
              <PrivateRoute path="/user/:page" component={UserLayout} />
              <Layout>
                <Content>
                  <TopNav {...this.props} />
                  <Route exact path="/" component={Home} {...this.props} />
                  <Route exact path="/home" component={Home} {...this.props} />
                  <Route exact path="/salons" component={Salons} {...this.props} />
                  <Route exact path="/makeup-artists" component={MakeupArtists} {...this.props} />
                  <Route exact path="/nail-techs" component={NailTechs} {...this.props} />
                  <Route exact path="/lash-techs" component={LashTechs} {...this.props} />
                  <Route exact path="/hair-details" component={HairDetails} {...this.props} />
                  <Route exact path="/about-us" component={AboutUs} {...this.props} />
                  <Route exact path="/contact-us" component={ContactUs} {...this.props} />
                  <Route exact path="/salon/:id" component={Salon} {...this.props} />
                  <Route exact path="/hair-information" component={Feedback} {...this.props} />
                  <Route exact path="/privacy" component={Privacy} {...this.props} />
                  <Route exact path="/Faq" component={FAQ} {...this.props} />
                  <Route exact path="/cart" component={Cart} {...this.props} />
                  <Route exact path="/Terms-of-services" component={Terms} {...this.props} />
                  <Footer {...this.props} />
                </Content>
              </Layout>
            </Switch>
          </div>
        </React.Fragment>
      </div>
    )
  }
}

export default withRouter(withCookies(App))
