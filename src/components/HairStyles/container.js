import { connect } from 'react-redux'
import { getSalonsData } from '../../store/home/salons/duck'
import { getBestHairStylist, getSalonsByHairStyles } from '../../store/home/hairStyles/duck'
import { addRatings, UpgradeSalonsRating } from '../../store/home/ratings/duck'
import HairStylesComponent from './index'

const HairStylesContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {	
  	getBestHairStylist,
  	getSalonsData,
  	addRatings,
  	UpgradeSalonsRating,
  	getSalonsByHairStyles
  }
)(HairStylesComponent)

export default HairStylesContainer
