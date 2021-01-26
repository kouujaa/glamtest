import { connect } from 'react-redux'

import FooterComponent from './component'

const FooterContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(FooterComponent)

export default FooterContainer
