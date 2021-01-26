import { connect } from 'react-redux'
import { getSignUpData, userClearPhase, submitEmailAddress, getServiceStyles } from '../../store/user/duck'
import HomeComponent from './index'

const HomeContainer = connect(
  // Map state to props
  (state) => ({
  	signupdata: state.user.signupdata,
    signupdataPhase: state.user.signupdataPhase,
    getServiceStylesPhase: state.user.getServiceStylesPhase,
    getServiceStylesData: state.user.getServiceStylesData
  }),
  // Map actions to dispatch and props
  {	
  	getSignUpData,
    userClearPhase,
    submitEmailAddress,
    getServiceStyles
  }
)(HomeComponent)

export default HomeContainer
