import { connect } from 'react-redux'
import { getSignUpData , userClearPhase } from '../../store/user/duck'
import { getSalonsData, ClearPhase } from '../../store/home/salons/duck'
import { addRatings, UpgradeSalonsRating } from '../../store/home/ratings/duck'
import SalonsComponent from './index'

const SalonsContainer = connect(
  // Map state to props
  (state) => ({
    signUpPageDetailsPhase: state.user.signUpPageDetailsPhase,
  	signUpPageDetailsData: state.user.signUpPageDetailsData,
    getSalonsData : state.homeSalons.getSalonsData,
  }),
  // Map actions to dispatch and props
  { 
   getSignUpData,
   getSalonsData,
   addRatings,
   UpgradeSalonsRating,
   ClearPhase,
   userClearPhase
  }
)(SalonsComponent)

export default SalonsContainer
