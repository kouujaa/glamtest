import { connect } from 'react-redux'
import { signupUser,userClearPhase } from '../../../store/user/duck'
import AdminSignupComponent from './index'

const AdminSignupContainer = connect(
// Map state to props
state => ({
    signupPhase: state.user.signupPhase,
    signupuserdata: state.user.signupuserdata,
    signUpPageDetailsPhase: state.user.signUpPageDetailsPhase,
    signUpPageDetailsData: state.user.signUpPageDetailsData,
    message: state.user.message,
  }),
// Map actions to dispatch and props
    {
        signupUser,
        userClearPhase
    }
)(AdminSignupComponent)

export default AdminSignupContainer