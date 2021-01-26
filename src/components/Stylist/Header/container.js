import { connect } from 'react-redux'
import { logout,subscriptionPayment,getPaymentDataById, disableSalon } from '../../../store/user/duck'
import HeaderComponent from './index'

const HeaderContainer = connect(
  // Map state to props
  (/*state*/) => ({}),
  // Map actions to dispatch and props
  {
    logout,
    subscriptionPayment,
    getPaymentDataById,
    disableSalon
  }
)(HeaderComponent)

export default HeaderContainer
