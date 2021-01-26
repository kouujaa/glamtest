import { connect } from 'react-redux'
import { getContactInfo } from '../../../store/user/duck'
import { sendMail } from '../../../store/admin/users/duck'
import ContactInfoComponent from './index'

const ContactInfoContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
  	getContactInfo,
  	sendMail
  }
)(ContactInfoComponent)

export default ContactInfoContainer
