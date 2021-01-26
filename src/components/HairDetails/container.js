import { connect } from 'react-redux'
import HairDetailsComponent from './index'

const HairDetailsContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(HairDetailsComponent)

export default HairDetailsContainer
