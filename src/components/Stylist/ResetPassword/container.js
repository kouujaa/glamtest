import { connect } from 'react-redux'
import { UpdatePassword } from '../../../store/user/duck'
import ResetPasswordComponent from './index'

const ResetPasswordContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
  	UpdatePassword
  }
)(ResetPasswordComponent)

export default ResetPasswordContainer
