import { connect } from 'react-redux'
import { getSalonsData } from '../../store/home/salons/duck'
import { getBestNailTechs } from '../../store/home/nailTechs/duck'
import { addRatings, UpgradeSalonsRating } from '../../store/home/ratings/duck'
import NailTechComponent from './index'

const NailTechContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {	
  	getBestNailTechs,
  	getSalonsData,
  	addRatings,
  	UpgradeSalonsRating,
  }
)(NailTechComponent)

export default NailTechContainer
