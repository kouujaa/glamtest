import { connect } from 'react-redux'
import { ResetPasswordLink } from '../../store/user/duck'
import ForgetPasswordComponent from './index'

const ForgetPasswordContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
  	ResetPasswordLink
  }
)(ForgetPasswordComponent)

export default ForgetPasswordContainer
