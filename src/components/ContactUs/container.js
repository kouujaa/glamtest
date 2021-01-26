import { connect } from 'react-redux'
import { addContactInfo, userClearPhase } from '../../store/user/duck'
import ContactUsComponent from './index'

const ContactUsContainer = connect(
  // Map state to props
  state => ({
    addContactInfoPhase: state.user.addContactInfoPhase,
    addContactInfoData: state.user.addContactInfoData,
  }),
  // Map actions to dispatch and props
  {
    addContactInfo,
    userClearPhase
  }
)(ContactUsComponent)

export default ContactUsContainer
