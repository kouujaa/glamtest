import { connect } from 'react-redux'
import { logout } from '../../../store/user/duck'
import HeaderComponent from './index'

const HeaderContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
  	logout
  }
)(HeaderComponent)

export default HeaderContainer
