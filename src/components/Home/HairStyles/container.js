import { connect } from 'react-redux'
import { getTopHairStylist } from '../../../store/home/hairStyles/duck'
import HairStylesComponent from './index'

const HairStylesContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
  	getTopHairStylist
  }
)(HairStylesComponent)

export default HairStylesContainer
