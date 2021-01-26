import { connect } from 'react-redux'
import { getUser, EditUser } from '../../../store/user/duck'
import { getSignUpData, userClearPhase } from '../../../store/user/duck'
import EditProfileComponent from './index'

const EditProfileContainer = connect(
  // Map state to props
  state => ({
  	signupdata: state.user.signupdata,
    signupdataPhase: state.user.signupdataPhase
  }),
  // Map actions to dispatch and props
  {	
  	getUser,
  	getSignUpData,
    EditUser,
  	userClearPhase
  }
)(EditProfileComponent)

export default EditProfileContainer
