import { connect } from 'react-redux'
import { getAllUsers, adminUserClearPhase } from '../../../store/admin/users/duck'
import { UpdateUserStatus } from '../../../store/user/duck'
import UsersComponent from './index'

const UsersContainer = connect(
  // Map state to props
  state => ({

  }),
  // Map actions to dispatch and props
  { getAllUsers,
  	UpdateUserStatus,
  	adminUserClearPhase,
  }
)(UsersComponent)

export default UsersContainer
