import { connect } from 'react-redux'

import PrivacyComponent from './component'

const PrivacyContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(PrivacyComponent)

export default PrivacyContainer
