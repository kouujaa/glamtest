import { connect } from 'react-redux'
import { UpdatePassword } from '../../../store/user/duck'  
import ProfileComponent from './index'

const ProfileContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
  	UpdatePassword
  }
)(ProfileComponent)

export default ProfileContainer
