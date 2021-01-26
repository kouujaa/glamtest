import { connect } from 'react-redux'
import { getSalonsData } from '../../store/home/salons/duck'
import { getBestHairTypes, getSalonsByHairTypes } from '../../store/home/hairTypes/duck'
import { addRatings, UpgradeSalonsRating } from '../../store/home/ratings/duck'
import HairTypesComponent from './index'

const HairTypesContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
  	getSalonsData,
  	getBestHairTypes,
  	addRatings,
  	UpgradeSalonsRating,
  	getSalonsByHairTypes
  }
)(HairTypesComponent)

export default HairTypesContainer
