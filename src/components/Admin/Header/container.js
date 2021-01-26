import { connect } from 'react-redux'
import { logout } from '../../../store/user/duck'
import HeaderComponent from './index.js'

const HeaderContainer = connect(
  // Map state to props
  state => ({
  	user : state.user.user,
  	loginPhase: state.user.loginPhase,
  	logoutPhase : state.user.logoutPhase,
  }),
  // Map actions to dispatch and props
  { logout }
)(HeaderComponent)

export default HeaderContainer
