import { connect } from 'react-redux'
import { getSalonsDataById, EditSalons} from '../../../store/home/salons/duck'
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
  	getSalonsDataById,
  	getSignUpData,
    EditSalons,
  	userClearPhase
  }
)(EditProfileComponent)

export default EditProfileContainer
