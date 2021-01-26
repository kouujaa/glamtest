import { connect } from 'react-redux'

import AboutUsComponent from './component'

const AboutUsContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(AboutUsComponent)

export default AboutUsContainer
