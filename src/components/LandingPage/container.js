import { connect } from 'react-redux'
import { landingPageNotify } from '../../store/user/duck'

import LandingPageComponent from  './index'

const LandingPageContainer = connect(
    // Map state to props
    () => ({}),
    // Map actions to dispatch and props
    {landingPageNotify}
)(LandingPageComponent)

export default LandingPageContainer