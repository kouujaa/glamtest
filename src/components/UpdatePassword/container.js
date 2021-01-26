import { connect } from 'react-redux'
import { UpdatePasswordByLink } from '../../store/user/duck'
import UpdatePasswordComponent from './index'

const UpdatePasswordContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
  	UpdatePasswordByLink
  }
)(UpdatePasswordComponent)

export default UpdatePasswordContainer
