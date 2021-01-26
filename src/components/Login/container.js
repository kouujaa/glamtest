import { connect } from 'react-redux'
import { loginUser, userClearPhase } from '../../store/user/duck'

import LoginComponent from './index'

const LoginContainer = connect(
  // Map state to props
  state => ({
    message: state.user.message,
    user: state.user.user,
    loginPhase: state.user.loginPhase
  }),
  // Map actions to dispatch and props
  { loginUser, userClearPhase }
)(LoginComponent)

export default LoginContainer
