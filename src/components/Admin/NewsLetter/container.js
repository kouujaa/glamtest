import { connect } from 'react-redux'
import { getNewsLetterEmail } from '../../../store/user/duck'
import { sendMail } from '../../../store/admin/users/duck'
import NewsLetterComponent from './index'

const NewsLetterContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  { 
  	getNewsLetterEmail,
  	sendMail
  }
)(NewsLetterComponent)

export default NewsLetterContainer
