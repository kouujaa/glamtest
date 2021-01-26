import { connect } from 'react-redux'
import { logout, getUser } from '../../store/user/duck'
import TopNavComponent from './index'

const TopNavContainer = connect(
  // Map state to props
  (state) => ({
  	user: state.user.user,
  }),
  // Map actions to dispatch and props
  { 
  	logout,
  	getUser 
  }
)(TopNavComponent)

export default TopNavContainer
