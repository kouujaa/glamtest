import { connect } from 'react-redux'

import SideNavComponent from './component'

const SideNavContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(SideNavComponent)

export default SideNavContainer
