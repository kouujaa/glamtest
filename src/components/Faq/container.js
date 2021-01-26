import { connect } from 'react-redux'

import FaqComponent from './component'

const FaqContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(FaqComponent)

export default FaqContainer
