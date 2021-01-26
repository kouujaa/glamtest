import { connect } from 'react-redux'
import { getSalonsData } from '../../store/home/salons/duck'
import { getBestMakeupArtist } from '../../store/home/makeupArtist/duck'
import { addRatings, UpgradeSalonsRating } from '../../store/home/ratings/duck'
import MakeupArtistComponent from './index'

const MakeupArtistContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {	
  	getBestMakeupArtist,
  	getSalonsData,
  	addRatings,
  	UpgradeSalonsRating,
  }
)(MakeupArtistComponent)

export default MakeupArtistContainer
