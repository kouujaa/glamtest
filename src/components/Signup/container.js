import { connect } from 'react-redux'
import { signupUser, getSignUpData, userClearPhase } from '../../store/user/duck'
import SignupComponent from './index'

const SignupContainer = connect(
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
    userClearPhase,
    getSignUpData
  }
)(SignupComponent)

export default SignupContainer
