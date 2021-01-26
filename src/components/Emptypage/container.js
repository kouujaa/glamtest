import { connect } from 'react-redux'

import EmptypageComponent from './component'

const EmptypageContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {}
)(EmptypageComponent)

export default EmptypageContainer
