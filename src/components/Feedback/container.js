import { connect } from 'react-redux'

import FeedbackComponent from './component'

const FeedbackContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(FeedbackComponent)

export default FeedbackContainer
