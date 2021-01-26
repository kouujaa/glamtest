import { connect } from 'react-redux'

import TermsAndConditionsComponent from './component'

const TermsAndConditionsContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(TermsAndConditionsComponent)

export default TermsAndConditionsContainer
