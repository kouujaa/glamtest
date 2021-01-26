import { connect } from 'react-redux'

import HairSalonsComponent from './component'

const HairSalonsContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(HairSalonsComponent)

export default HairSalonsContainer
