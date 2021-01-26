import { connect } from 'react-redux'
import FooterComponent from './index'
import { submitEmailAddress } from '../../store/user/duck'

const FooterContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  { submitEmailAddress
  }
)(FooterComponent)

export default FooterContainer
